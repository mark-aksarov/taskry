import prisma from "@/lib/prisma";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { createProjectCategory } from "../projectCategory.dal";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("ProjectCategory DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.workspace.create({ data: { id: 1 } });
    await prisma.workspace.create({ data: { id: 2 } });

    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Category 1", workspaceId: 1 },
        { id: 2, name: "Category 2", workspaceId: 1 },
        { id: 3, name: "Category 3", workspaceId: 2 },
        { id: 4, name: "Category 4", workspaceId: 2 },
      ],
    });
  });

  describe("createProjectCategory", () => {
    it("should successfully create a project category and automatically assign the workspaceId", async () => {
      const input = {
        id: 100,
        name: "Urgent Projects",
      };

      const result = await createProjectCategory(input);

      expect(result).toBeDefined();
      expect(result.name).toBe("Urgent Projects");
      expect(result.workspaceId).toBe(1);

      const dbCategory = await prisma.projectCategory.findUnique({
        where: { id: result.id },
      });
      expect(dbCategory).not.toBeNull();
      expect(dbCategory?.workspaceId).toBe(1);
    });

    it("should overwrite any workspaceId provided in the input with the session workspaceId", async () => {
      const input = {
        id: 100,
        name: "Security Test Category",
        workspaceId: 2,
      } as any;

      const result = await createProjectCategory(input);

      expect(result.workspaceId).toBe(1);
      expect(result.workspaceId).not.toBe(2);
    });

    it("should throw a database error if the category name is missing", async () => {
      const input = {} as any;

      await expect(createProjectCategory(input)).rejects.toThrow();
    });
  });
});
