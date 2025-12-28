import prisma from "@/lib/prisma";
import { getNotifications } from "../notification.service";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Position DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });
  });

  describe("getNotifications", () => {
    beforeEach(async () => {
      vi.resetAllMocks();
      await resetDatabase();

      const mockSession = { user: { id: "user-1", workspaceId: 1 } };
      (verifySession as any).mockResolvedValue(mockSession);

      await prisma.workspace.create({ data: { id: 1 } });

      await prisma.projectCategory.create({
        data: { id: 1, name: "General", workspaceId: 1 },
      });
      await prisma.taskCategory.create({
        data: { id: 1, name: "General", workspaceId: 1 },
      });
      await prisma.company.create({
        data: { id: 1, name: "Test Co", workspaceId: 1 },
      });

      await prisma.user.createMany({
        data: [
          {
            id: "user-1",
            fullName: "John Doe",
            email: "john@test.com",
            workspaceId: 1,
          },
          {
            id: "user-2",
            fullName: "Jane Doe",
            email: "jane@test.com",
            workspaceId: 1,
          },
        ],
      });

      await prisma.customer.create({
        data: {
          id: 1,
          fullName: "Client X",
          email: "x@client.com",
          companyId: 1,
          workspaceId: 1,
        },
      });

      await prisma.project.create({
        data: {
          id: 1,
          title: "Project Alpha",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: "active",
        },
      });

      await prisma.task.create({
        data: {
          id: 1,
          title: "Designing the DB schema.",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: "active",
        },
      });

      await prisma.notification.createMany({
        data: [
          {
            id: 1,
            type: "projectAdded",
            recipientId: "user-1",
            workspaceId: 1,
            isRead: false,
          },
          {
            id: 2,
            type: "taskAdded",
            recipientId: "user-1",
            workspaceId: 1,
            isRead: true,
          },
          {
            id: 3,
            type: "taskDeleted",
            recipientId: "user-1",
            workspaceId: 1,
            targetName: "Designing the DB schema.",
            isRead: false,
          },
          {
            id: 4,
            type: "customerAdded",
            actorId: "user-1",
            recipientId: "user-2",
            workspaceId: 1,
          },
          {
            id: 5,
            type: "userUpdated",
            actorId: "user-1",
            recipientId: "user-2",
            workspaceId: 1,
          },
        ],
      });

      await prisma.notificationTarget.createMany({
        data: [
          {
            id: 1,
            notificationId: 1,
            projectId: 1,
            createdAt: new Date("2025-01-02T00:00:00.000Z"),
          },
          {
            id: 2,
            notificationId: 2,
            taskId: 1,
            createdAt: new Date("2025-01-02T00:00:00.000Z"),
          },
          {
            id: 3,
            notificationId: 4,
            customerId: 1,
            createdAt: new Date(),
          },
          {
            id: 4,
            notificationId: 5,
            userId: "user-2",
            createdAt: new Date(),
          },
        ],
      });
    });

    it("should return notifications for user-1 and workspace 1", async () => {
      const result = await getNotifications({
        page: 1,
        pageSize: 10,
        filter: "all",
      });

      expect(result.items).toHaveLength(3);
      expect(result.totalCount).toBe(3);
      expect(result.items.map((i) => i.id)).toEqual(
        expect.arrayContaining([1, 2, 3]),
      );
    });

    it("should filter only unread notifications when filter is set to 'unread'", async () => {
      const result = await getNotifications({
        page: 1,
        pageSize: 10,
        filter: "unread",
      });

      expect(result.items).toHaveLength(2);
      expect(result.unreadCount).toBe(2);
      expect(result.items.every((i) => i.isRead === false)).toBe(true);
    });

    it("should correctly map Project target data", async () => {
      const result = await getNotifications({ page: 1, pageSize: 10 });
      const projectNotification = result.items.find((n) => n.id === 1);

      expect(projectNotification?.target?.project).toBeDefined();
      expect(projectNotification?.target?.project?.title).toBe("Project Alpha");
    });

    it("should correctly map Customer target data", async () => {
      (verifySession as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 1 },
      });

      const result = await getNotifications({ page: 1, pageSize: 10 });
      const customerNotification = result.items.find((n) => n.id === 4);

      expect(customerNotification?.type).toBe("customerAdded");
      expect(customerNotification?.target?.customer?.fullName).toBe("Client X");
      expect(customerNotification?.actor?.fullName).toBe("John Doe");
    });

    it("should return targetName and undefined target when the entity is deleted (id: 3)", async () => {
      const result = await getNotifications({ page: 1, pageSize: 10 });
      const deletedNotification = result.items.find((n) => n.id === 3);

      expect(deletedNotification?.targetName).toBe("Designing the DB schema.");
      expect(deletedNotification?.target).toBeUndefined();
    });

    it("should handle pagination correctly", async () => {
      const result = await getNotifications({ page: 1, pageSize: 1 });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(3);
    });
  });
});
