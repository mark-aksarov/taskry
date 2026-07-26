import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
  projects,
  tasks,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updateSubtask } from "../subtask.dal";
import { members } from "@/prisma/seed/test-data";
import { setupAuth } from "@/lib/test-utils/auth";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateSubtask", () => {
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

  afterEach(async () => {
    await prisma.subtask.deleteMany();
  });

  it("should successfully update subtask", async () => {
    await prisma.subtask.create({
      data: {
        id: 1,
        text: "Subtask 1",
        taskId: 1,
        isDone: false,
      },
    });

    const result = await updateSubtask({
      id: 1,
      text: "Updated Subtask Text",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.text).toBe("Updated Subtask Text");
  });

  it("should throw an error when trying to update a subtask from another organization", async () => {
    await prisma.subtask.create({
      data: {
        id: 1,
        text: "Subtask 1",
        taskId: 3,
        isDone: false,
      },
    });

    await expect(
      updateSubtask({
        id: 1,
        text: "Updated Subtask Text",
      }),
    ).rejects.toThrow();
  });

  describe("RBAC: update subtask", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.subtask.create({
        data: {
          id: 1,
          text: "Subtask 1",
          taskId: 1,
          isDone: false,
        },
      });

      return {
        updateInput: {
          id: 1,
          text: "Updated Subtask Text",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1");
      const result = await updateSubtask(updateInput);
      expect(result).toBeDefined();
      expect(result!.text).toBe(updateInput.text);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateSubtask(updateInput);
      expect(result).toBeDefined();
      expect(result!.text).toBe(updateInput.text);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updateSubtask(updateInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
