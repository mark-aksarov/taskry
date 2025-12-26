import {
  getUserList,
  deleteUsers,
  getUserCount,
  getUserDetail,
  getUserSummaries,
} from "../user.dal";

import prisma from "@/lib/prisma";
import * as mappers from "../user.mapper";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("Company DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

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

    (getSessionOrThrow as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });
  });

  describe("getUserSummaries", () => {
    it("should return all users from the current workspace", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapUserSummaryToDTO");

      const result = await getUserSummaries();

      expect(result).toHaveLength(3);
      expect(result.some((u) => u.fullName === "Alice")).toBe(true);
      expect(result.some((u) => u.fullName === "Bob")).toBe(true);
      expect(result.some((u) => u.fullName === "Dave")).toBe(true);

      expect(mapperSpy).toHaveBeenCalledTimes(3);
    });

    it("should not return users from other workspaces", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 2 },
      });

      const result = await getUserSummaries();

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Charlie");

      expect(result.find((u) => u.id === "user-1")).toBeUndefined();
    });

    it("should fail if the session is missing", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(getUserSummaries()).rejects.toThrow("Unauthorized");
    });
  });

  describe("getUserDetail", () => {
    it("should return detailed user data when id and workspace match", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapUserDetailToDTO");

      const result = await getUserDetail("user-1");

      expect(result).toBeDefined();
      expect(result.id).toBe("user-1");

      expect(mapperSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "user-1",
          fullName: "Alice",
        }),
      );
    });

    it("should throw 'User not found' if user exists but belongs to a different workspace", async () => {
      await expect(getUserDetail("user-3")).rejects.toThrow("User not found");
    });

    it("should throw 'User not found' if user id does not exist in database", async () => {
      await expect(getUserDetail("non-existent-uuid")).rejects.toThrow(
        "User not found",
      );
    });

    it("should fail if unauthorized access (no session)", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(getUserDetail("user-1")).rejects.toThrow("Unauthorized");
    });
  });

  describe("getUserList", () => {
    it("should return paginated users for the current workspace", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 1,
        sort: "fullName",
      });

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Alice");

      const secondPage = await getUserList({
        page: 2,
        pageSize: 1,
        sort: "fullName",
      });

      expect(secondPage).toHaveLength(1);
      expect(secondPage[0].fullName).toBe("Bob");
    });

    it("should sort users by position name", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "position",
      });

      expect(result[0].fullName).toBe("Bob");
      expect(result[1].fullName).toBe("Alice");
    });

    describe("getUserList Filters", () => {
      it("should filter users who have active tasks", async () => {
        const result = await getUserList({
          page: 1,
          pageSize: 10,
          sort: "fullName",
          filters: { hasActiveTasks: true, position: [] },
        });

        expect(result).toHaveLength(2);
        expect(result[0].fullName).toBe("Alice");
        expect(result[1].fullName).toBe("Bob");
      });

      it("should filter users who have overdue tasks", async () => {
        const result = await getUserList({
          page: 1,
          pageSize: 10,
          sort: "fullName",
          filters: { hasOverdueTasks: true, position: [] },
        });

        expect(result).toHaveLength(1);
        expect(result[0].fullName).toBe("Bob");
      });

      it("should filter users who have NO active tasks", async () => {
        const result = await getUserList({
          page: 1,
          pageSize: 10,
          sort: "fullName",
          filters: { hasNoActiveTasks: true, position: [] },
        });

        expect(result).toHaveLength(1);
        expect(result[0].fullName).toBe("Dave");
      });

      it("should filter users by position", async () => {
        const result = await getUserList({
          page: 1,
          pageSize: 10,
          sort: "fullName",
          filters: { position: [1] },
        });

        expect(result).toHaveLength(1);
        expect(result[0].fullName).toBe("Bob");
      });

      it("should combine position and task filters", async () => {
        const result = await getUserList({
          page: 1,
          pageSize: 10,
          sort: "fullName",
          filters: {
            position: [2],
            hasActiveTasks: true,
          },
        });

        expect(result).toHaveLength(1);
        expect(result[0].fullName).toBe("Alice");
      });
    });

    it("should strictly isolate users by workspace", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 2 },
      });

      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
      });

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Charlie");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await getUserList({
        page: 99,
        pageSize: 10,
        sort: "fullName",
      });

      expect(result).toEqual([]);
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
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-new", workspaceId: 3 },
      });

      const count = await getUserCount();
      expect(count).toBe(0);
    });

    it("should strictly isolate count by workspace", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 2 },
      });

      const count = await getUserCount();
      expect(count).toBe(1);
    });
  });

  describe("deleteUsers", () => {
    it("should successfully delete multiple users in the current workspace", async () => {
      const count = await deleteUsers(["user-2", "user-4"]);

      expect(count).toBe(2);

      const remainingUsers = await prisma.user.findMany({
        where: { workspaceId: 1 },
      });

      expect(remainingUsers).toHaveLength(1);
      expect(remainingUsers[0].id).toBe("user-1");
    });

    it("should only delete own users even if foreign user IDs are provided", async () => {
      const count = await deleteUsers(["user-2", "user-3"]);

      expect(count).toBe(1);

      const foreignUser = await prisma.user.findUnique({
        where: { id: "user-3" },
      });
      expect(foreignUser).not.toBeNull();
    });

    it("should throw an error if no users were deleted", async () => {
      await expect(deleteUsers(["non-existent-id"])).rejects.toThrow(
        "No users deleted.",
      );
    });

    it("should throw an error if trying to delete exclusively another workspace's user", async () => {
      await expect(deleteUsers(["user-3"])).rejects.toThrow(
        "No users deleted.",
      );
    });

    it("should fail if the session is missing", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(deleteUsers(["user-2"])).rejects.toThrow("Unauthorized");
    });
  });
});
