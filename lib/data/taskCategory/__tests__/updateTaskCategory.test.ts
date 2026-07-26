import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { updateTaskCategory } from "../taskCategory.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateTaskCategory", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await setupAuth("user-1");
  });

  afterEach(async () => {
    await prisma.taskCategory.deleteMany();
  });

  it("should successfully update a task category", async () => {
    await prisma.taskCategory.create({
      data: {
        id: 1,
        name: "Task Category 1",
        organizationId: "org-1",
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

  it("should throw an error when trying to update a task category from another organization", async () => {
    await prisma.taskCategory.create({
      data: {
        id: 1,
        name: "Task Category 1",
        organizationId: "org-2",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Task Category 1",
          organizationId: "org-1",
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
      const { updateInput } = await setup("user-1");
      const result = await updateTaskCategory(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateTaskCategory(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });
  });
});
