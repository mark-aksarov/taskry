import {
  users,
  tasks,
  clients,
  projects,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  UnauthorizedError,
} from "../../utils/error";

import { seed } from "@/prisma/test-seed";
import { createSubtask } from "../subtask.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createSubtask", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });

    await setupAuth("user-1");
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

  it("should fail if the task belongs to a different organization", async () => {
    const createSubtaskPromise = createSubtask({
      text: "Subtask 1",
      taskId: 3,
    });

    await expect(createSubtaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(createSubtaskPromise).rejects.toThrow(/Task access denied/i);
  });

  describe("RBAC: create subtask", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      const createInput = {
        text: "Subtask 1",
        taskId: 1,
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1");
      const result = await createSubtask(createInput);
      expect(result).toBeDefined();
      expect(result.text).toBe(createInput.text);
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");
      const result = await createSubtask(createInput);
      expect(result).toBeDefined();
      expect(result.text).toBe(createInput.text);
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();
      await expect(createSubtask(createInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
