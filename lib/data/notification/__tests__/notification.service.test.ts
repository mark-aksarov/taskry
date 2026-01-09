import prisma from "@/lib/prisma";
import { getNotifications } from "../notification.service";
import { resetDatabase } from "@/prisma/resetDatabase";
import {
  NotificationType,
  ProjectStatus,
  TaskStatus,
} from "@/generated/prisma/enums";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
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
          email: "user-1@test.com",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          workspaceId: 2,
        },
        {
          id: "user-4",
          fullName: "User 4",
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
          createdAt: "2025-01-01T00:00:00.000Z",
          isRead: true,
        },
        {
          id: 2,
          workspaceId: 1,
          actorId: "user-2",
          recipientId: "user-1",
          taskId: 1,
          taskTitle: "Task 1",
          taskDeadline: "2026-12-10T00:00:00.000Z",
          taskStatus: TaskStatus.active,
          type: NotificationType.taskAdded,
          createdAt: "2025-01-02T00:00:00.000Z",
          isRead: false,
        },
        {
          id: 3,
          workspaceId: 2,
          actorId: "user-4",
          recipientId: "user-3",
          projectId: 2,
          projectTitle: "Project 2",
          projectDeadline: "2027-05-20T00:00:00.000Z",
          projectStatus: ProjectStatus.active,
          type: NotificationType.projectAdded,
          createdAt: "2025-01-01T00:00:00.000Z",
          isRead: true,
        },
      ],
    });

    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });
  });

  describe("getNotifications", () => {
    it("should return notifications for user-1 and workspace 1", async () => {
      const result = await getNotifications({
        page: 1,
        pageSize: 2,
        filter: "all",
      });

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.unreadCount).toBe(1);

      expect(result.items[0].id).toBe(2);
      expect(result.items[0].isRead).toBe(false);
      expect(result.items[0].actor!.id).toBe("user-2");
      expect(result.items[0].task!.id).toBe(1);

      expect(result.items[1].id).toBe(1);
      expect(result.items[1].isRead).toBe(true);
      expect(result.items[1].actor!.id).toBe("user-2");
      expect(result.items[1]).toBeDefined();
      expect(result.items[1].project).toBeDefined();
      expect(result.items[1].project!.id).toBe(1);
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
      const result = await getNotifications({ page: 1, pageSize: 1 });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(2);
    });

    it("should return notifications for user-3 and workspace 2", async () => {
      (verifySession as any).mockResolvedValue({
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
