import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { deleteNotification } from "../notification.dal";
import { NotificationType } from "@/generated/prisma/enums";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";
import { AccessDeniedError } from "../../utils/error";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("TaskCategory DAL", () => {
  beforeEach(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }, { id: 2 }] });

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
          role: "manager",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
          role: "guest",
          workspaceId: 1,
        },
        {
          id: "user-5",
          fullName: "User 5",
          email: "user-5@test.com",
          role: "manager",
          workspaceId: 2,
        },
        {
          id: "user-6",
          fullName: "User 6",
          email: "user-6@test.com",
          role: "user",
          workspaceId: 2,
        },
      ],
    });
  });

  describe("deleteNotification", () => {
    it("should not delete tasks from a different workspace", async () => {
      const notificationId = 100;

      await prisma.notification.create({
        data: {
          id: notificationId,
          type: NotificationType.taskDeleted,
          isRead: false,
          taskTitle: "Task 1",
          workspaceId: 2,
          actorId: "user-5",
          recipientId: "user-6",
        },
      });

      await expect(deleteNotification(notificationId)).rejects.toThrow();
    });

    it("should not delete tasks for a different recipient", async () => {
      const notificationId = 100;

      await prisma.notification.create({
        data: {
          id: notificationId,
          type: NotificationType.taskDeleted,
          isRead: false,
          taskTitle: "Task 1",
          workspaceId: 1,
          actorId: "user-1",
          recipientId: "user-2",
        },
      });

      await expect(deleteNotification(notificationId)).rejects.toThrow();
    });

    describe("notification RBAC Deletion", () => {
      const notificationId = 100;

      const setup = async (userId: string, role: string) => {
        (verifySession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        await prisma.notification.create({
          data: {
            id: notificationId,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-2",
            recipientId: userId,
          },
        });
      };

      it("should succeed for owner", async () => {
        await setup("user-1", "owner");
        const result = await deleteNotification(notificationId);
        expect(result.taskTitle).toBe("Task 1");
      });

      it("should succeed for manager", async () => {
        await setup("user-2", "manager");
        const result = await deleteNotification(notificationId);
        expect(result.taskTitle).toBe("Task 1");
      });

      it("should fail for user", async () => {
        await setup("user-3", "user");
        const result = await deleteNotification(notificationId);
        expect(result.taskTitle).toBe("Task 1");
      });

      it("should fail for guest", async () => {
        await setup("user-4", "user");
        await expect(deleteNotification(notificationId)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });
});
