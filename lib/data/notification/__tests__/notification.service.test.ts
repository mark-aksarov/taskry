import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { getNotifications } from "../notification.service";
import { NotificationType } from "@/generated/prisma/enums";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Notification Service", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

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
          imageUrl: "https://example.com/user-1.jpg",
          email: "user-1@test.com",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          imageUrl: "https://example.com/user-2.jpg",
          email: "user-2@test.com",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          imageUrl: "https://example.com/user-3.jpg",
          email: "user-3@test.com",
          workspaceId: 2,
        },
        {
          id: "user-4",
          fullName: "User 4",
          imageUrl: "https://example.com/user-4.jpg",
          email: "user-4@test.com",
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
          status: "active",
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 2,
          status: "active",
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
          status: "active",
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 2,
          status: "active",
        },
      ],
    });

    await prisma.comment.createMany({
      data: [
        {
          id: 1,
          content: "Comment 1",
          taskId: 1,
          senderId: "user-1",
          workspaceId: 1,
        },
        {
          id: 2,
          content: "Comment 2",
          taskId: 1,
          senderId: "user-1",
          workspaceId: 2,
        },
      ],
    });

    await prisma.notification.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          actorId: "user-2",
          recipientId: "user-1",
          projectId: 1,
          projectTitle: "Project 1",
          commentContent: "Comment Content",
          type: NotificationType.commentDeleted,
          createdAt: new Date("2025-03-01"),
          isRead: true,
        },
        {
          id: 2,
          workspaceId: 1,
          actorId: "user-2",
          recipientId: "user-1",
          taskId: 1,
          taskTitle: "Task 1",
          type: NotificationType.taskAdded,
          createdAt: new Date("2025-03-02"),
          isRead: false,
        },
        {
          id: 3,
          workspaceId: 2,
          actorId: "user-4",
          recipientId: "user-3",
          projectId: 2,
          projectTitle: "Project 2",
          type: NotificationType.projectAdded,
          createdAt: new Date("2025-03-03"),
          isRead: true,
        },
      ],
    });

    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });
  });

  describe("getNotifications", () => {
    it("should return all notifications with valid NotificationsDTO", async () => {
      const result = await getNotifications({
        page: 1,
        pageSize: 2,
        filter: "all",
      });

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.unreadCount).toBe(1);

      expect(result).toEqual({
        items: expect.arrayContaining([
          {
            id: 1,
            type: NotificationType.commentDeleted,
            createdAt: new Date("2025-03-01"),
            isRead: true,
            commentContent: "Comment Content",

            actor: {
              id: "user-2",
              fullName: "User 2",
              imageUrl: "https://example.com/user-2.jpg",
            },

            project: {
              id: 1,
              title: "Project 1",
            },
            projectTitle: "Project 1",
          },
          {
            id: 2,
            type: NotificationType.taskAdded,
            createdAt: new Date("2025-03-02"),
            isRead: false,

            actor: {
              id: "user-2",
              fullName: "User 2",
              imageUrl: "https://example.com/user-2.jpg",
            },

            task: {
              id: 1,
              title: "Task 1",
            },
            taskTitle: "Task 1",
          },
        ]),
        totalCount: 2,
        unreadCount: 1,
      });
    });

    it("should filter only unread notifications when filter is set to 'unread'", async () => {
      const result = await getNotifications({
        page: 1,
        pageSize: 10,
        filter: "unread",
      });

      expect(result.items).toHaveLength(1);
      expect(result.unreadCount).toBe(1);
      expect(result.items[0].id).toBe(2);
      expect(result.items[0].isRead).toBe(false);
      expect(result.items[0].actor!.id).toBe("user-2");
      expect(result.items[0].task!.id).toBe(1);
    });

    it("should handle pagination correctly", async () => {
      const firstPage = await getNotifications({ page: 1, pageSize: 1 });

      expect(firstPage.items).toHaveLength(1);
      expect(firstPage.totalCount).toBe(2);

      const secondPage = await getNotifications({ page: 2, pageSize: 1 });

      expect(secondPage.items).toHaveLength(1);
      expect(secondPage.totalCount).toBe(2);
    });

    it("should return notifications for user-3 and workspace 2", async () => {
      (requireSession as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 2 },
      });

      const result = await getNotifications({ page: 1, pageSize: 1 });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);

      expect(result.items[0].id).toBe(3);
      expect(result.items[0].isRead).toBe(true);
      expect(result.items[0].actor!.id).toBe("user-4");
      expect(result.items[0].project!.id).toBe(2);
    });
  });
});
