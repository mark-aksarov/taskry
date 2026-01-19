import {
  createTask,
  updateTask,
  deleteTasks,
  getTaskCount,
  updateTaskStatuses,
} from "../task.dal";

import {
  TaskStatus,
  ProjectStatus,
  NotificationType,
} from "@/generated/prisma/enums";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Task DAL", () => {
  beforeEach(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }, { id: 2 }] });

    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 2 },
      ],
    });

    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 2 },
      ],
    });

    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 2 },
      ],
    });

    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          role: "owner",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "guest",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
          role: "owner",
          workspaceId: 2,
        },
      ],
    });

    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          companyId: 1,
          workspaceId: 2,
        },
      ],
    });

    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 2,
          status: ProjectStatus.active,
        },
      ],
    });
  });

  describe("getTaskCount", () => {
    it("should return the total count of tasks for the current workspace", async () => {
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

      const count = await getTaskCount();
      expect(count).toBe(2);
    });
  });

  describe("createTask", () => {
    it("should successfully create a task and send notifications", async () => {
      const projectId = 1;

      const result = await createTask({
        title: "New Task",
        status: TaskStatus.active,
        projectId: projectId,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date(),
      });

      const notifications = await prisma.notification.findMany({
        where: { taskId: result.id },
      });

      expect(result).toBeDefined();
      expect(result.title).toBe(result.title);
      expect(result.workspaceId).toBe(1);
      expect(result.creatorId).toBe("user-1");
      expect(result.projectId).toBe(projectId);

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: result.id,
        taskTitle: "New Task",
        projectId: null,
        commentId: null,
        projectTitle: null,
        type: NotificationType.taskAdded,
        workspaceId: 1,
      };

      expect(notifications.length).toBe(2);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-3",
          }),
        ]),
      );
    });

    it("should fail if the project belongs to a different workspace", async () => {
      await expect(
        createTask({
          title: "New Task",
          status: TaskStatus.active,
          projectId: 2,
          categoryId: 1,
          assigneeId: "user-1",
          deadline: new Date(),
        }),
      ).rejects.toThrow();
    });

    it("should fail if the assignee belongs to a different workspace", async () => {
      await expect(
        createTask({
          title: "New Task",
          status: TaskStatus.active,
          projectId: 1,
          categoryId: 1,
          assigneeId: "user-4",
          deadline: new Date(),
        }),
      ).rejects.toThrow();
    });

    it("should fail if the task category belongs to a different workspace", async () => {
      await expect(
        createTask({
          title: "New Task",
          status: TaskStatus.active,
          projectId: 1,
          categoryId: 2,
          assigneeId: "user-1",
          deadline: new Date(),
        }),
      ).rejects.toThrow();
    });

    it("should create a task without optional fields", async () => {
      const result = await createTask({
        title: "New Task",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        deadline: new Date(),
      });

      expect(result.id).toBeDefined();
      expect(result.assigneeId).toBeNull();
    });

    describe("RBAC: create task", () => {
      const setup = async (userId: string, role: string) => {
        (verifySession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        const createInput = {
          title: "New Task",
          status: TaskStatus.active,
          projectId: 1,
          categoryId: 1,
          assigneeId: "user-2",
          deadline: new Date(),
        };

        return {
          createInput,
        };
      };

      it("should succeed for owner", async () => {
        const { createInput } = await setup("user-1", "owner");
        const result = await createTask(createInput);
        expect(result).toBeDefined();
        expect(result.title).toBe(createInput.title);
      });

      it("should succeed for user", async () => {
        const { createInput } = await setup("user-2", "user");
        const result = await createTask(createInput);
        expect(result).toBeDefined();
        expect(result.title).toBe(createInput.title);
      });

      it("should fail for guest", async () => {
        const { createInput } = await setup("user-3", "guest");
        await expect(createTask(createInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });

  describe("updateTask", () => {
    it("should successfully update task and send notifications", async () => {
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
        },
      });

      const result = await updateTask({
        id: taskId,
        title: "Updated Task Title",
      });

      const notifications = await prisma.notification.findMany({
        where: { taskId: result.id },
      });

      expect(result).not.toBeNull();
      expect(result!.id).toBe(taskId);
      expect(result!.title).toBe("Updated Task Title");

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: result.id,
        taskTitle: "Updated Task Title",
        projectId: null,
        commentId: null,
        projectTitle: null,
        type: NotificationType.taskChanged,
        workspaceId: 1,
      };

      expect(notifications.length).toBe(2);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-3",
          }),
        ]),
      );
    });

    it("should throw an error when trying to update a task from another workspace", async () => {
      const taskId = 100;

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          workspaceId: 2,
          status: TaskStatus.active,
        },
      });

      const updateInput = {
        id: taskId,
        title: "Updated Task Title",
      };

      await expect(updateTask(updateInput)).rejects.toThrow();
    });

    describe("RBAC: update task", () => {
      const setup = async (userId: string, role: string) => {
        (verifySession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
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
          },
        });

        return {
          updateInput: {
            id: taskId,
            title: "Updated Task Title",
          },
        };
      };

      it("should succeed for owner", async () => {
        const { updateInput } = await setup("user-1", "owner");
        const result = await updateTask(updateInput);
        expect(result.title).toBe(updateInput.title);
      });

      it("should fail for user", async () => {
        const { updateInput } = await setup("user-2", "user");
        const result = await updateTask(updateInput);
        expect(result.title).toBe(updateInput.title);
      });

      it("should fail for guest", async () => {
        const { updateInput } = await setup("user-3", "guest");

        await expect(updateTask(updateInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });

    it("should fail if the project belongs to a different workspace", async () => {
      await expect(
        updateTask({
          id: 1,
          projectId: 2,
        }),
      ).rejects.toThrow();
    });

    it("should fail if the assignee belongs to a different workspace", async () => {
      await expect(
        updateTask({
          id: 1,
          assigneeId: "user-4",
        }),
      ).rejects.toThrow();
    });

    it("should fail if the task category belongs to a different workspace", async () => {
      await expect(
        updateTask({
          id: 1,
          categoryId: 2,
        }),
      ).rejects.toThrow();
    });
  });

  describe("updateTaskStatuses", () => {
    it("should update multiple task statuses and send notifications", async () => {
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

      const notifications = await prisma.notification.findMany({
        where: { taskId: { in: taskIds } },
      });

      expect(updatedTasks.length).toBe(2);
      expect(updatedTasks).toEqual([
        expect.objectContaining({ id: 1, status: nextStatus }),
        expect.objectContaining({ id: 2, status: nextStatus }),
      ]);

      expect(notifications).toHaveLength(4);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            actorId: "user-1",
            taskId: 1,
            taskTitle: "Task 1",
            recipientId: "user-2",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskId: 1,
            taskTitle: "Task 1",
            recipientId: "user-3",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskId: 2,
            taskTitle: "Task 2",
            recipientId: "user-2",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskId: 2,
            taskTitle: "Task 2",
            recipientId: "user-3",
          }),
        ]),
      );
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
      const notifications = await prisma.notification.findMany();

      expect(result.length).toBe(0);
      expect(notifications).toHaveLength(0);
    });

    describe("RBAC: update task status", () => {
      const setup = async (
        userId: string,
        role: string,
        assigneeId?: string,
      ) => {
        (verifySession as any).mockResolvedValue({
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
            assigneeId,
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

  describe("deleteTasks", () => {
    it("should successfully delete tasks and send notifications", async () => {
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
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const result = await deleteTasks([1, 2]);

      expect(result.count).toBe(2);
      const remainingTasks = await prisma.task.findMany();
      const notifications = await prisma.notification.findMany();

      expect(remainingTasks).toHaveLength(0);

      expect(notifications.length).toBe(4);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            actorId: "user-1",
            taskTitle: "Task 1",
            projectId: null,
            commentId: null,
            projectTitle: null,
            type: NotificationType.taskDeleted,
            workspaceId: 1,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskTitle: "Task 2",
            projectId: null,
            commentId: null,
            projectTitle: null,
            type: NotificationType.taskDeleted,
            workspaceId: 1,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskTitle: "Task 1",
            projectId: null,
            commentId: null,
            projectTitle: null,
            type: NotificationType.taskDeleted,
            workspaceId: 1,
            recipientId: "user-3",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskTitle: "Task 2",
            projectId: null,
            commentId: null,
            projectTitle: null,
            type: NotificationType.taskDeleted,
            workspaceId: 1,
            recipientId: "user-3",
          }),
        ]),
      );
    });

    it("should not delete tasks from a different workspace", async () => {
      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task 1",
            deadline: new Date(),
            projectId: 2,
            categoryId: 2,
            workspaceId: 2,
            status: TaskStatus.active,
          },
        ],
      });

      const result = await deleteTasks([1]);
      const notifications = await prisma.notification.findMany();

      expect(result.count).toBe(0);
      expect(notifications).toHaveLength(0);
    });

    it("should only delete tasks belonging to the current workspace", async () => {
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

      const validId = 1;
      const invalidId = 2;
      const mixedIds = [validId, invalidId];

      const result = await deleteTasks(mixedIds);

      expect(result.count).toBe(1);

      const task = await prisma.task.findUnique({
        where: { id: invalidId },
      });
      const notifications = await prisma.notification.findMany();

      expect(task).not.toBeNull();

      expect(notifications).toHaveLength(2);
      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            recipientId: "user-2",
          }),
          expect.objectContaining({
            recipientId: "user-3",
          }),
        ]),
      );
    });

    it("should return 0 if an empty array is provided", async () => {
      const result = await deleteTasks([]);
      expect(result.count).toBe(0);
    });

    describe("RBAC: delete tasks", () => {
      const taskId = 100;

      const setup = async (userId: string, role: string) => {
        (verifySession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        await prisma.task.create({
          data: {
            id: taskId,
            title: "Task 1",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
          },
        });
      };

      it("should succeed for owner", async () => {
        await setup("user-1", "owner");
        const result = await deleteTasks([taskId]);
        expect(result.count).toBe(1);
      });

      it("should fail for user", async () => {
        await setup("user-2", "user");
        const result = await deleteTasks([taskId]);
        expect(result.count).toBe(1);
      });

      it("should fail for guest", async () => {
        await setup("user-3", "guest");
        await expect(deleteTasks([taskId])).rejects.toThrow(AccessDeniedError);
      });
    });
  });
});
