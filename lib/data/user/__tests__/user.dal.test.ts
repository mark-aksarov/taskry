import prisma from "@/lib/prisma";
import { deleteUsers, getUserCount } from "../user.dal";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("User DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (verifySession as any).mockResolvedValue(mockSession);

    await prisma.workspace.create({ data: { id: 1 } });
    await prisma.workspace.create({ data: { id: 2 } });

    await prisma.position.createMany({
      data: [
        { id: 1, name: "Alpha Position", workspaceId: 1 },
        { id: 2, name: "Zeta Position", workspaceId: 1 },
      ],
    });

    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          positionId: 2,
          fullName: "Alice",
          email: "alice@ws1.com",
          workspaceId: 1,
        },
        {
          id: "user-2",
          positionId: 1,
          fullName: "Bob",
          email: "bob@ws1.com",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "Dave",
          email: "dave@ws1.com",
          workspaceId: 1,
        },
      ],
    });

    await prisma.user.create({
      data: {
        id: "user-3",
        fullName: "Charlie",
        email: "charlie@ws2.com",
        workspaceId: 2,
      },
    });

    await prisma.projectCategory.create({
      data: {
        id: 1,
        name: "Development",
        workspaceId: 1,
      },
    });

    await prisma.project.create({
      data: {
        id: 1,
        deadline: new Date(),
        title: "Internal Project",
        workspaceId: 1,
        categoryId: 1,
        status: "active",
        creatorId: "user-1",
      },
    });

    await prisma.taskCategory.create({
      data: {
        id: 1,
        name: "Category 1",
        workspaceId: 1,
      },
    });

    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Future Task",
          status: "active",
          deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
          assigneeId: "user-1",
          workspaceId: 1,
          projectId: 1,
          categoryId: 1,
        },
        {
          id: 2,
          title: "Overdue Task",
          status: "active",
          deadline: new Date(Date.now() - 24 * 60 * 60 * 1000),
          assigneeId: "user-2",
          workspaceId: 1,
          projectId: 1,
          categoryId: 1,
        },
        {
          id: 3,
          title: "Done Task",
          status: "completed",
          deadline: new Date(),
          assigneeId: "user-1",
          workspaceId: 1,
          projectId: 1,
          categoryId: 1,
        },
      ],
    });

    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });
  });

  describe("getUserCount", () => {
    it("should return total count of users in the current workspace", async () => {
      const count = await getUserCount();
      expect(count).toBe(3);
    });

    it("should return count of users with active tasks", async () => {
      const count = await getUserCount({ hasActiveTasks: true, position: [] });
      expect(count).toBe(2);
    });

    it("should return count of users with overdue tasks", async () => {
      const count = await getUserCount({ hasOverdueTasks: true, position: [] });
      expect(count).toBe(1);
    });

    it("should return count of users with NO active tasks", async () => {
      const count = await getUserCount({
        hasNoActiveTasks: true,
        position: [],
      });
      expect(count).toBe(1);
    });

    it("should return count of users by position", async () => {
      const count = await getUserCount({ position: [1] });
      expect(count).toBe(1);
    });

    it("should return 0 for workspace with no users", async () => {
      await prisma.workspace.create({ data: { id: 3 } });
      (verifySession as any).mockResolvedValue({
        user: { id: "user-new", workspaceId: 3 },
      });

      const count = await getUserCount();
      expect(count).toBe(0);
    });

    it("should strictly isolate count by workspace", async () => {
      (verifySession as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 2 },
      });

      const count = await getUserCount();
      expect(count).toBe(1);
    });
  });

  describe("deleteUsers", () => {
    it("should successfully delete multiple users in the current workspace", async () => {
      const result = await deleteUsers(["user-2", "user-4"]);

      expect(result.count).toBe(2);

      const remainingUsers = await prisma.user.findMany({
        where: { workspaceId: 1 },
      });

      expect(remainingUsers).toHaveLength(1);
      expect(remainingUsers[0].id).toBe("user-1");
    });

    it("should only delete own users even if foreign user IDs are provided", async () => {
      const result = await deleteUsers(["user-2", "user-3"]);

      expect(result.count).toBe(1);

      const foreignUser = await prisma.user.findUnique({
        where: { id: "user-3" },
      });
      expect(foreignUser).not.toBeNull();
    });

    it("should return count 0 if no users were deleted", async () => {
      const result = await deleteUsers(["non-existent-id"]);
      expect(result.count).toBe(0);
    });

    it("should return count 0 if trying to delete exclusively another workspace's user", async () => {
      const result = await deleteUsers(["user-3"]);
      expect(result.count).toBe(0);
    });

    it("should fail if the session is missing", async () => {
      (verifySession as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(deleteUsers(["user-2"])).rejects.toThrow("Unauthorized");
    });
  });
});
