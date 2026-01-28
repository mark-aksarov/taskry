import prisma from "@/lib/prisma";
import { getCompanySummaries } from "../company.service";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Company Service", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (requireSession as any).mockResolvedValue(mockSession);

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
      const result = await getCompanySummaries();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("WS1 Company");
    });

    it("should not return companies from other workspaces", async () => {
      (requireSession as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 2 },
      });

      const result = await getCompanySummaries();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("WS2 Company");
      expect(result.find((c) => c.name === "WS1 Company")).toBeUndefined();
    });

    it("should return an empty array if the workspace has no companies", async () => {
      await prisma.workspace.create({ data: { id: 3 } });
      (requireSession as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getCompanySummaries();
      expect(result).toEqual([]);
    });

    it("should fail if session is missing", async () => {
      (requireSession as any).mockRejectedValue(new Error("Unauthorized"));
      await expect(getCompanySummaries()).rejects.toThrow("Unauthorized");
    });
  });
});
