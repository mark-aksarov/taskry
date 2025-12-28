import { createTaskCategory } from "../taskCategory.dal";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("TaskCategory DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.workspace.create({ data: { id: 1 } });
  });

  describe("createTaskCategory", () => {
    it("should successfully create a task category and automatically assign the workspaceId", async () => {
      const input = {
        name: "Urgent Tasks",
      };

      const result = await createTaskCategory(input);

      expect(result).toBeDefined();
      expect(result.name).toBe("Urgent Tasks");
      expect(result.workspaceId).toBe(1);

      const dbCategory = await prisma.taskCategory.findUnique({
        where: { id: result.id },
      });
      expect(dbCategory).not.toBeNull();
      expect(dbCategory?.workspaceId).toBe(1);
    });

    it("should overwrite any workspaceId provided in the input with the session workspaceId", async () => {
      const input = {
        name: "Security Test Category",
        workspaceId: 2,
      } as any;

      const result = await createTaskCategory(input);

      expect(result.workspaceId).toBe(1);
      expect(result.workspaceId).not.toBe(2);
    });

    it("should throw a database error if the category name is missing", async () => {
      const input = {} as any;

      await expect(createTaskCategory(input)).rejects.toThrow();
    });
  });
});
