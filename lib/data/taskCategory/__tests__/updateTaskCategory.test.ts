import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { AccessDeniedError } from "../../utils/error";
import { updateTaskCategory } from "../taskCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateTaskCategory", () => {
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

  it("should successfully update a task category", async () => {
    await prisma.taskCategory.create({
      data: {
        id: 1,
        name: "Task Category 1",
        workspaceId: 1,
      },
    });

    const result = await updateTaskCategory({
      id: 1,
      name: "Updated Task Category Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.name).toBe("Updated Task Category Name");
  });

  it("should throw an error when trying to update a task category from another workspace", async () => {
    await prisma.taskCategory.create({
      data: {
        id: 1,
        name: "Task Category 1",
        workspaceId: 2,
      },
    });

    const updateTaskCategoryPromise = updateTaskCategory({
      id: 1,
      name: "Updated Task Category Name",
    });

    await expect(updateTaskCategoryPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateTaskCategoryPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update task category", () => {
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

      return {
        updateInput: {
          id: 1,
          name: "Updated Task Category Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateTaskCategory(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateTaskCategory(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateTaskCategory(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
