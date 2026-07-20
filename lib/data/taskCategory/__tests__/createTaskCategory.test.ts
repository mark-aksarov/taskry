import { seed } from "@/prisma/test-seed";
import { AccessDeniedError, LimitExceededError } from "../../utils/error";
import { it, expect, describe, beforeAll } from "vitest";
import { createTaskCategory } from "../taskCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { TASK_CATEGORY_MAX_COUNT } from "../../constants";
import prisma from "@/lib/prisma";

describe("createTaskCategory", () => {
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

  it("should successfully create a taskCategory", async () => {
    const input = {
      id: 1,
      name: "Task Category 1",
    };

    const result = await createTaskCategory(input);

    expect(result).toBeDefined();
    expect(result.name).toBe("Task Category 1");
    expect(result.workspaceId).toBe(1);
  });

  it("should fail when task category limit is reached", async () => {
    const categories = [];

    for (let i = 1; i <= TASK_CATEGORY_MAX_COUNT; i++) {
      categories.push({
        workspaceId: 1,
        name: `Task Category ${i}`,
      });
    }

    await prisma.taskCategory.createMany({
      data: categories,
    });

    await expect(
      createTaskCategory({
        name: "New Task Category",
      }),
    ).rejects.toThrow(LimitExceededError);

    await prisma.taskCategory.deleteMany();
  });

  describe("RBAC: create task category", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        id: 1,
        name: "Task Category 1",
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createTaskCategory(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createTaskCategory(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createTaskCategory(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
