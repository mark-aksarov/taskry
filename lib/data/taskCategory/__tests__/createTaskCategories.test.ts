import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { it, expect, describe, beforeAll } from "vitest";
import { PROJECT_CATEGORY_MAX_COUNT } from "../../constants";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { createTaskCategories } from "../taskCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { AccessDeniedError, LimitExceededError } from "../../utils/error";

describe("createTaskCategories", () => {
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

  it("should successfully create taskCategories", async () => {
    const input = [
      {
        id: 1,
        name: "Task Category 1",
      },
      {
        id: 2,
        name: "Task Category 2",
      },
    ];

    const result = await createTaskCategories(input);

    expect(result).toBeDefined();
    expect(result.count).toBe(2);

    const taskCategories = await prisma.taskCategory.findMany({
      where: {
        workspaceId: 1,
      },
      orderBy: {
        id: "asc",
      },
    });

    expect(taskCategories).toHaveLength(2);
    expect(taskCategories[0].name).toBe("Task Category 1");
    expect(taskCategories[1].name).toBe("Task Category 2");
  });

  it("should fail when creating task categories exceeds the limit", async () => {
    const categories = [];

    for (let i = 1; i < PROJECT_CATEGORY_MAX_COUNT; i++) {
      categories.push({
        workspaceId: 1,
        name: `Task Category ${i}`,
      });
    }

    await prisma.taskCategory.createMany({
      data: categories,
    });

    await expect(
      createTaskCategories([
        {
          name: "Task Category 1",
        },
        {
          name: "Task Category 2",
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.taskCategory.deleteMany();
  });

  describe("RBAC: create task categories", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = [
        {
          id: 1,
          name: "Task Category 1",
        },
        {
          id: 2,
          name: "Task Category 2",
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");

      const result = await createTaskCategories(createInput);

      expect(result).toBeDefined();
      expect(result.count).toBe(2);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createTaskCategories(createInput);

      expect(result).toBeDefined();
      expect(result.count).toBe(2);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createTaskCategories(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
