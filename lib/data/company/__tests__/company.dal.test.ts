import prisma from "@/lib/prisma";
import { createCompany } from "../company.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Company DAL", () => {
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
      (requireSession as any).mockRejectedValue(new Error("Unauthorized"));

      const input = { name: "Failure Inc" };

      await expect(createCompany(input)).rejects.toThrow("Unauthorized");

      const dbCompany = await prisma.company.findFirst({
        where: { name: "Failure Inc" },
      });
      expect(dbCompany).toBeNull();
    });
  });
});
