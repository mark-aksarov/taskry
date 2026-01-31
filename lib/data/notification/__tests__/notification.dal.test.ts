import {
  deleteNotification,
  markNotificationsAsRead,
} from "../notification.dal";

import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../../utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { NotificationType } from "@/generated/prisma/enums";
import { vi, describe, beforeEach, it, expect, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Notification DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.notification.deleteMany();
  });

  beforeAll(async () => {
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
          role: "manager",
          workspaceId: 2,
        },
        {
          id: "user-5",
          fullName: "User 5",
          email: "user-5@test.com",
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
          actorId: "user-4",
          recipientId: "user-5",
        },
      });

      await expect(deleteNotification(notificationId)).rejects.toThrow();
    });

    it("should not delete notifications for a different recipient", async () => {
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

    describe("RBAC: delete notification", () => {
      const notificationId = 100;

      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
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

      it("should succeed for user", async () => {
        await setup("user-2", "user");
        const result = await deleteNotification(notificationId);
        expect(result.taskTitle).toBe("Task 1");
      });

      it("should fail for guest", async () => {
        await setup("user-3", "guest");
        await expect(deleteNotification(notificationId)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });

  describe("mark notifications as read", () => {
    it("should not mark notifications as read from a different workspace", async () => {
      const notificationId = 100;

      await prisma.notification.createMany({
        data: [
          {
            id: notificationId,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 2,
            actorId: "user-4",
            recipientId: "user-5",
          },
        ],
      });

      const result = await markNotificationsAsRead([notificationId]);
      const notification = await prisma.notification.findFirst();
      expect(result.count).toBe(0);
      expect(notification!.isRead).toBe(false);
    });

    it("should not mark notifications as read for a different recipient", async () => {
      const notificationId = 100;

      await prisma.notification.createMany({
        data: [
          {
            id: notificationId,
            type: NotificationType.taskDeleted,
            isRead: false,
            taskTitle: "Task 1",
            workspaceId: 1,
            actorId: "user-1",
            recipientId: "user-2",
          },
        ],
      });

      const result = await markNotificationsAsRead([notificationId]);
      const notification = await prisma.notification.findFirst();
      expect(result.count).toBe(0);
      expect(notification!.isRead).toBe(false);
    });

    describe("RBAC: mark notifications as read", () => {
      const notificationId = 100;

      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
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
        const result = await markNotificationsAsRead([notificationId]);
        const notification = await prisma.notification.findFirst();
        expect(result.count).toBe(1);
        expect(notification!.isRead).toBe(true);
      });

      it("should succeed for user", async () => {
        await setup("user-2", "user");
        const result = await markNotificationsAsRead([notificationId]);
        const notification = await prisma.notification.findFirst();
        expect(result.count).toBe(1);
        expect(notification!.isRead).toBe(true);
      });

      it("should fail for guest", async () => {
        await setup("user-3", "guest");
        await expect(markNotificationsAsRead([notificationId])).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });
});
