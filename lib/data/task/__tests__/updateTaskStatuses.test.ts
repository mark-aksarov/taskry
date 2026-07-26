import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updateTaskStatuses } from "../task.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { TaskStatus } from "@/generated/prisma/enums";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateTaskStatuses", () => {
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
    });

    await setupAuth("user-1");
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
  });

  it("should update multiple task statuses", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          assigneeId: "user-1",
          status: TaskStatus.active,
        },
        {
          id: 3,
          title: "Task 3",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          organizationId: "org-2",
          status: TaskStatus.active,
        },
      ],
    });

    const taskIds = [1, 2];
    const nextStatus = TaskStatus.completed;

    const updatedTasks = await updateTaskStatuses(taskIds, nextStatus);

    expect(updatedTasks.length).toBe(2);
    expect(updatedTasks).toEqual([
      expect.objectContaining({ id: 1, status: nextStatus }),
      expect.objectContaining({ id: 2, status: nextStatus }),
    ]);
  });

  it("should return empty array when attempting to update tasks from a different organization", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          organizationId: "org-2",
          status: TaskStatus.active,
        },
      ],
    });

    const taskIds = [2];

    const result = await updateTaskStatuses(taskIds, "completed");

    expect(result.length).toBe(0);
  });

  describe("RBAC: update task status", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);
      const taskId = 100;

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");

      const updatedTask = await updateTaskStatuses([100], "completed");

      expect(updatedTask.length).toBe(1);
      expect(updatedTask![0].status).toBe("completed");
    });

    it("should succeed for member", async () => {
      await setup("user-2");

      const updatedTask = await updateTaskStatuses([100], "completed");

      expect(updatedTask.length).toBe(1);
      expect(updatedTask![0].status).toBe("completed");
    });

    it("should fail for anonymous", async () => {
      await setup();

      await expect(updateTaskStatuses([100], "completed")).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
