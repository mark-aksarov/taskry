import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { members } from "@/prisma/seed/test-data";
import { setupAuth } from "@/lib/test-utils/auth";
import { UnauthorizedError } from "../../utils/error";
import { deleteTaskCategories } from "../taskCategory.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("deleteTaskCategories", () => {
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

  it("should successfully delete task categories", async () => {
    await prisma.taskCategory.createMany({
      data: [
        {
          id: 1,
          name: "Task Category 1",
          organizationId: "org-1",
        },
        {
          id: 2,
          name: "Task Category 2",
          organizationId: "org-1",
        },
      ],
    });

    const result = await deleteTaskCategories([1, 2]);

    expect(result.count).toBe(2);
    const remainingTaskCategories = await prisma.taskCategory.findMany();

    expect(remainingTaskCategories).toHaveLength(0);
  });

  it("should not delete task categories from a different organization", async () => {
    await prisma.taskCategory.createMany({
      data: [
        {
          id: 1,
          name: "Task Category 1",
          organizationId: "org-2",
        },
      ],
    });

    const result = await deleteTaskCategories([1]);
    expect(result.count).toBe(0);
  });

  it("should only delete task categories belonging to the current organization", async () => {
    await prisma.taskCategory.createMany({
      data: [
        {
          id: 1,
          name: "Task Category 1",
          organizationId: "org-1",
        },
        {
          id: 2,
          name: "Task Category 2",
          organizationId: "org-2",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Task Category 1",
          organizationId: "org-1",
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deleteTaskCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deleteTaskCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deleteTaskCategories([1])).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
