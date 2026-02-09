import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-utils/seed";
import { updateTaskStatuses } from "../task.dal";
import { TaskStatus } from "@/generated/prisma/enums";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateTaskStatuses", () => {
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
    });
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
          workspaceId: 1,
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          assigneeId: "user-3",
          status: TaskStatus.active,
        },
        {
          id: 3,
          title: "Task 3",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          workspaceId: 2,
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

  it("should return empty array when attempting to update tasks from a different workspace", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          workspaceId: 2,
          status: TaskStatus.active,
        },
      ],
    });

    const taskIds = [2];

    const result = await updateTaskStatuses(taskIds, "completed");

    expect(result.length).toBe(0);
  });

  describe("RBAC: update task status", () => {
    const setup = async (userId: string, role: string, assigneeId?: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, role, workspaceId: 1 },
      });

      const taskId = 100;

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
          assigneeId: assigneeId,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");

      const updatedTask = await updateTaskStatuses([100], "completed");

      expect(updatedTask.length).toBe(1);
      expect(updatedTask![0].status).toBe("completed");
    });

    it("should succeed for assignee user", async () => {
      await setup("user-2", "user");

      const updatedTask = await updateTaskStatuses([100], "completed");

      expect(updatedTask.length).toBe(1);
      expect(updatedTask![0].status).toBe("completed");
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");

      await expect(updateTaskStatuses([100], "completed")).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
