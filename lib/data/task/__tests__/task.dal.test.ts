import {
  createTask,
  updateTask,
  deleteTasks,
  getTaskCount,
  updateTaskStatuses,
} from "../task.dal";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { TaskStatus, ProjectStatus } from "@/generated/prisma/enums";
import { vi, describe, it, expect, beforeEach, beforeAll } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Task DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.task.deleteMany();
  });

  beforeAll(async () => {
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
    it("should successfully create a task", async () => {
      const projectId = 1;

      const result = await createTask({
        title: "New Task",
        status: TaskStatus.active,
        projectId: projectId,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date(),
      });

      expect(result).toBeDefined();
      expect(result.title).toBe(result.title);
      expect(result.workspaceId).toBe(1);
      expect(result.creatorId).toBe("user-1");
      expect(result.projectId).toBe(projectId);
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
        (requireSession as any).mockResolvedValue({
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
    it("should successfully update task", async () => {
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

      expect(result).not.toBeNull();
      expect(result!.id).toBe(taskId);
      expect(result!.title).toBe("Updated Task Title");
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

    it("should fail if the project belongs to a different workspace", async () => {
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

      await expect(
        updateTask({
          id: taskId,
          projectId: 2,
        }),
      ).rejects.toThrow();
    });

    it("should fail if the assignee belongs to a different workspace", async () => {
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

      await expect(
        updateTask({
          id: taskId,
          assigneeId: "user-4",
        }),
      ).rejects.toThrow();
    });

    it("should fail if the task category belongs to a different workspace", async () => {
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

      await expect(
        updateTask({
          id: taskId,
          categoryId: 2,
        }),
      ).rejects.toThrow();
    });

    describe("RBAC: update task", () => {
      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
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
      const setup = async (
        userId: string,
        role: string,
        assigneeId?: string,
      ) => {
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
            assigneeId: assigneeId ?? Prisma.skip,
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
    it("should successfully delete tasks", async () => {
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

      expect(remainingTasks).toHaveLength(0);
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

      expect(result.count).toBe(0);
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

      expect(task).not.toBeNull();
    });

    it("should return 0 if an empty array is provided", async () => {
      const result = await deleteTasks([]);
      expect(result.count).toBe(0);
    });

    describe("RBAC: delete tasks", () => {
      const taskId = 100;

      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
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
