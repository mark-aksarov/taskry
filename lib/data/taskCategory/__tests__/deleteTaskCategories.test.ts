import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { AccessDeniedError } from "../../utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { deleteTaskCategories } from "../taskCategory.dal";

describe("deleteTaskCategories", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
    });
  });

  afterEach(async () => {
    await prisma.taskCategory.deleteMany();
  });

  it("should successfully delete task categories", async () => {
    await prisma.taskCategory.createMany({
      data: [
        {
          id: 1,
          name: "Task Category 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Task Category 2",
          workspaceId: 1,
        },
      ],
    });

    const result = await deleteTaskCategories([1, 2]);

    expect(result.count).toBe(2);
    const remainingTaskCategories = await prisma.taskCategory.findMany();

    expect(remainingTaskCategories).toHaveLength(0);
  });

  it("should not delete task categories from a different workspace", async () => {
    await prisma.taskCategory.createMany({
      data: [
        {
          id: 1,
          name: "Task Category 1",
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteTaskCategories([1]);
    expect(result.count).toBe(0);
  });

  it("should only delete task categories belonging to the current workspace", async () => {
    await prisma.taskCategory.createMany({
      data: [
        {
          id: 1,
          name: "Task Category 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Task Category 2",
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteTaskCategories([1, 2]);
    expect(result.count).toBe(1);
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteTaskCategories([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete task categories", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Task Category 1",
          workspaceId: 1,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteTaskCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteTaskCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteTaskCategories([1])).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
