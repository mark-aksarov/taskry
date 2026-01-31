import {
  TaskStatus,
  ProjectStatus,
  NotificationType,
} from "@/generated/prisma/enums";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { createSubtask, deleteSubtask, updateSubtask } from "../subtask.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { vi, describe, beforeEach, it, expect, beforeAll } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Subtask DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.subtask.deleteMany();
    await prisma.notification.deleteMany();
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
  });

  describe("createSubtask", () => {
    it("should successfully create a subtask and send notifications", async () => {
      const result = await createSubtask({
        text: "Subtask 1",
        taskId: 1,
      });

      const notifications = await prisma.notification.findMany();

      expect(result).toBeDefined();
      expect(result.text).toBe("Subtask 1");
      expect(result.taskId).toBe(1);

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: 1,
        taskTitle: "Task 1",
        subtaskId: result.id,
        subtaskText: "Subtask 1",
        type: NotificationType.subtaskAdded,
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

    it("should fail if the task belongs to a different workspace", async () => {
      await expect(
        createSubtask({
          text: "Subtask 1",
          taskId: 2,
        }),
      ).rejects.toThrow();
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

  describe("updateSubtask", () => {
    it("should successfully update subtask and send notifications", async () => {
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

      const notifications = await prisma.notification.findMany();

      expect(result).not.toBeNull();
      expect(result!.id).toBe(1);
      expect(result!.text).toBe("Updated Subtask Text");

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: 1,
        taskTitle: "Task 1",
        subtaskId: result.id,
        subtaskText: "Updated Subtask Text",
        type: NotificationType.subtaskChanged,
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

    it("should throw an error when trying to update a subtask from another workspace", async () => {
      await prisma.subtask.create({
        data: {
          id: 1,
          text: "Subtask 1",
          taskId: 2,
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
        expect(result.text).toBe(updateInput.text);
      });

      it("should fail for user", async () => {
        const { updateInput } = await setup("user-2", "user");
        const result = await updateSubtask(updateInput);
        expect(result.text).toBe(updateInput.text);
      });

      it("should fail for guest", async () => {
        const { updateInput } = await setup("user-3", "guest");

        await expect(updateSubtask(updateInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });

  describe("deleteSubtask", () => {
    it("should successfully delete subtask and send notifications", async () => {
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
      const notifications = await prisma.notification.findMany();

      expect(notifications.length).toBe(2);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            actorId: "user-1",
            taskId: 1,
            taskTitle: "Task 1",
            subtaskText: "Subtask 1",
            type: NotificationType.subtaskDeleted,
            workspaceId: 1,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            actorId: "user-1",
            taskId: 1,
            taskTitle: "Task 1",
            subtaskText: "Subtask 1",
            type: NotificationType.subtaskDeleted,
            workspaceId: 1,
            recipientId: "user-3",
          }),
        ]),
      );
    });

    it("should not delete subtasks from a different workspace", async () => {
      await prisma.subtask.createMany({
        data: [
          {
            id: 1,
            text: "Subtask 1",
            taskId: 2,
            isDone: false,
          },
        ],
      });

      const deleteSubtaskPromise = deleteSubtask(1);
      const notifications = await prisma.notification.findMany();

      await expect(deleteSubtaskPromise).rejects.toThrow(
        PrismaClientKnownRequestError,
      );
      await expect(deleteSubtaskPromise).rejects.toMatchObject({
        code: "P2025",
      });
      expect(notifications).toHaveLength(0);
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
});
