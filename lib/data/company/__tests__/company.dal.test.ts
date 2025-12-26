import prisma from "@/lib/prisma";
import * as mappers from "../company.mapper";
import { createCompany, getCompanySummaries } from "../company.dal";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("Company DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

    await prisma.workspace.create({ data: { id: 1 } });

    await prisma.company.create({
      data: {
        id: 1,
        name: "WS1 Company",
        workspaceId: 1,
      },
    });

    await prisma.workspace.create({ data: { id: 2 } });

    await prisma.company.create({
      data: {
        id: 2,
        name: "WS2 Company",
        workspaceId: 2,
      },
    });
  });

  describe("getCompanySummaries", () => {
    it("should return all company summaries for the current workspace", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapCompanySummaryToDTO");

      const result = await getCompanySummaries();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("WS1 Company");
      expect(mapperSpy).toHaveBeenCalled();
    });

    it("should not return companies from other workspaces", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 2 },
      });

      const result = await getCompanySummaries();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("WS2 Company");
      expect(result.find((c) => c.name === "WS1 Company")).toBeUndefined();
    });

    it("should return an empty array if the workspace has no companies", async () => {
      await prisma.workspace.create({ data: { id: 3 } });
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getCompanySummaries();
      expect(result).toEqual([]);
    });

    it("should fail if session is missing", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));
      await expect(getCompanySummaries()).rejects.toThrow("Unauthorized");
    });
  });

  describe("createCompany", () => {
    it("should successfully create a company with name and workspaceId from session", async () => {
      const input = {
        id: 3,
        name: "New Startup LLC",
      };

      const result = await createCompany(input);

      expect(result).toBeDefined();
      expect(result.name).toBe("New Startup LLC");
      expect(result.workspaceId).toBe(1);

      const dbCompany = await prisma.company.findUnique({
        where: { id: result.id },
      });

      expect(dbCompany).not.toBeNull();
      expect(dbCompany?.name).toBe("New Startup LLC");
      expect(dbCompany?.workspaceId).toBe(1);
    });

    it("should fail to create company if session is missing or expired", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      const input = { name: "Failure Inc" };

      await expect(createCompany(input)).rejects.toThrow("Unauthorized");

      const dbCompany = await prisma.company.findFirst({
        where: { name: "Failure Inc" },
      });
      expect(dbCompany).toBeNull();
    });
  });
});
