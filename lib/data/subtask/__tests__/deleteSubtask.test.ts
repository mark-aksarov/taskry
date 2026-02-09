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
import { deleteSubtask } from "../subtask.dal";
import { seed } from "@/prisma/test-utils/seed";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("deleteCustomers", () => {
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

  it("should successfully delete subtask", async () => {
    await prisma.subtask.createMany({
      data: [
        {
          id: 1,
          text: "Subtask 1",
          taskId: 1,
          isDone: false,
        },
      ],
    });

    const result = await deleteSubtask(1);

    expect(result.text).toBe("Subtask 1");
  });

  it("should not delete subtasks from a different workspace", async () => {
    await prisma.subtask.createMany({
      data: [
        {
          id: 1,
          text: "Subtask 1",
          taskId: 3,
          isDone: false,
        },
      ],
    });

    const deleteSubtaskPromise = deleteSubtask(1);

    await expect(deleteSubtaskPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(deleteSubtaskPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: delete subtask", () => {
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
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteSubtask(1);
      expect(result.text).toBe("Subtask 1");
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteSubtask(1);
      expect(result.text).toBe("Subtask 1");
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteSubtask(1)).rejects.toThrow(AccessDeniedError);
    });
  });
});
