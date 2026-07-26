import {
  tasks,
  users,
  clients,
  projects,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { deleteSubtask } from "../subtask.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("deleteSubtask", () => {
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

  it("should not delete subtasks from a different organization", async () => {
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
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deleteSubtask(1);
      expect(result.text).toBe("Subtask 1");
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deleteSubtask(1);
      expect(result.text).toBe("Subtask 1");
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deleteSubtask(1)).rejects.toThrow(UnauthorizedError);
    });
  });
});
