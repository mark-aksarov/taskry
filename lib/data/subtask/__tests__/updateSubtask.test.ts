import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
  tasks,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { updateSubtask } from "../subtask.dal";
import { seed } from "@/prisma/test-utils/seed";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateSubtask", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      customers,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });
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

  it("should throw an error when trying to update a subtask from another workspace", async () => {
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

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
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateSubtask(updateInput);
      expect(result).toBeDefined();
      expect(result!.text).toBe(updateInput.text);
    });

    it("should fail for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateSubtask(updateInput);
      expect(result).toBeDefined();
      expect(result!.text).toBe(updateInput.text);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateSubtask(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
