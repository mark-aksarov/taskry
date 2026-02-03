import {
  seedUsers,
  seedTasks,
  seedProjects,
  seedCompanies,
  seedCustomers,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { createSubtask } from "../subtask.dal";
import { AccessDeniedError, NotFoundError } from "../../utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("createSubtask", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedProjectCategories();
    await seedTaskCategories();
    await seedCompanies();
    await seedCustomers();
    await seedProjects();
    await seedTasks();
  });

  it("should successfully create a subtask", async () => {
    const result = await createSubtask({
      text: "Subtask 1",
      taskId: 1,
    });

    expect(result).toBeDefined();
    expect(result.text).toBe("Subtask 1");
    expect(result.taskId).toBe(1);
  });

  it("should fail if the task does not exist", async () => {
    const createSubtaskPromise = createSubtask({
      text: "Subtask 1",
      taskId: 999,
    });

    await expect(createSubtaskPromise).rejects.toThrow(NotFoundError);
    await expect(createSubtaskPromise).rejects.toThrow(/Task not found/i);
  });

  it("should fail if the task belongs to a different workspace", async () => {
    const createSubtaskPromise = createSubtask({
      text: "Subtask 1",
      taskId: 3,
    });

    await expect(createSubtaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(createSubtaskPromise).rejects.toThrow(/Task access denied/i);
  });

  describe("RBAC: create subtask", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        text: "Subtask 1",
        taskId: 1,
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createSubtask(createInput);
      expect(result).toBeDefined();
      expect(result.text).toBe(createInput.text);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createSubtask(createInput);
      expect(result).toBeDefined();
      expect(result.text).toBe(createInput.text);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createSubtask(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
