import {
  dates,
  seedWorkspaces,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { getUserList } from "../user.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterAll } from "vitest";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("getUserList", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
  });

  it("should return all users", async () => {
    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          phoneNumber: "phone 1",
          imageUrl: "https://example.com/user-1.jpg",
          publicLink: "https://example.com/user-1",
          positionId: 1,
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          phoneNumber: "phone 2",
          imageUrl: "https://example.com/user-2.jpg",
          publicLink: "https://example.com/user-2",
          positionId: 2,
          role: "user",
          workspaceId: 1,
        },
      ],
    });

    const firstPage = await getUserList({
      page: 1,
      pageSize: 10,
      sort: "fullName",
    });
    const secondPage = await getUserList({
      page: 2,
      pageSize: 1,
      sort: "fullName",
    });
    await prisma.user.deleteMany();

    expect(firstPage.items).toHaveLength(2);
    expect(firstPage.totalCount).toBe(2);
    expect(firstPage.items[0].fullName).toBe("User 1");
    expect(firstPage.items[1].fullName).toBe("User 2");

    expect(secondPage.items).toHaveLength(1);
    expect(secondPage.totalCount).toBe(2);
    expect(secondPage.items[0].fullName).toBe("User 2");
  });

  describe("sorting", () => {
    beforeAll(async () => {
      await prisma.user.createMany({
        data: [
          {
            id: "user-1",
            fullName: "User B",
            email: "user-1@test.com",
            role: "user",
            positionId: 2,
            workspaceId: 1,
          },
          {
            id: "user-2",
            fullName: "User A",
            email: "user-2@test.com",
            role: "user",
            positionId: 1,
            workspaceId: 1,
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it("should correctly sort tasks by fullName", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
      });

      expect(result.items[0].fullName).toBe("User A");
      expect(result.items[1].fullName).toBe("User B");
    });

    it("should correctly sort tasks by position", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "position",
      });

      expect(result.items[0].fullName).toBe("User A");
      expect(result.items[1].fullName).toBe("User B");
    });
  });

  describe("filtering", () => {
    beforeAll(async () => {
      await prisma.user.createMany({
        data: [
          {
            id: "user-1",
            fullName: "User A",
            email: "user-1@test.com",
            role: "user",
            positionId: 1,
            workspaceId: 1,
          },
          {
            id: "user-2",
            fullName: "User B",
            email: "user-2@test.com",
            role: "user",
            positionId: 1,
            workspaceId: 1,
          },
          {
            id: "user-3",
            fullName: "User C",
            email: "user-3@test.com",
            role: "user",
            positionId: 2,
            workspaceId: 1,
          },
        ],
      });

      await prisma.projectCategory.createMany({
        data: [
          {
            id: 1,
            name: "Category 1",
            workspaceId: 1,
          },
        ],
      });

      await prisma.taskCategory.createMany({
        data: [
          {
            id: 1,
            name: "Category 1",
            workspaceId: 1,
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
        ],
      });

      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task A",
            deadline: dates.overdue,
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task B",
            deadline: dates.today,
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-2",
          },
          {
            id: 3,
            title: "Task C",
            deadline: dates.nextWeek,
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.pending,
            assigneeId: "user-3",
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it("should filter users who have active tasks", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { hasActiveTasks: true, position: [] },
      });

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.items[0].fullName).toBe("User A");
      expect(result.items[1].fullName).toBe("User B");
    });

    it("should filter users who have overdue tasks", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { hasOverdueTasks: true, position: [] },
      });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.items[0].fullName).toBe("User A");
    });

    it("should filter users who have no active tasks", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { hasNoActiveTasks: true, position: [] },
      });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.items[0].fullName).toBe("User C");
    });

    it("should filter users by position", async () => {
      const result = await getUserList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { position: [1] },
      });

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.items[0].fullName).toBe("User A");
      expect(result.items[1].fullName).toBe("User B");
    });
  });

  describe("pagination", () => {
    beforeAll(async () => {
      await prisma.user.createMany({
        data: [
          {
            id: "user-1",
            fullName: "User 1",
            email: "user-1@test.com",
            role: "user",
            positionId: 1,
            workspaceId: 1,
          },
          {
            id: "user-2",
            fullName: "User 2",
            email: "user-2@test.com",
            role: "user",
            positionId: 1,
            workspaceId: 1,
          },
          {
            id: "user-3",
            fullName: "User 3",
            email: "user-3@test.com",
            role: "user",
            positionId: 1,
            workspaceId: 1,
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.user.deleteMany();
    });

    it("should correctly handle pagination (page and pageSize)", async () => {
      const page1 = await getUserList({
        page: 1,
        pageSize: 2,
        sort: "fullName",
      });

      const page2 = await getUserList({
        page: 2,
        pageSize: 2,
        sort: "fullName",
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].fullName).toBe("User 1");
      expect(page1.items[1].fullName).toBe("User 2");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].fullName).toBe("User 3");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await getUserList({
        page: 99,
        pageSize: 10,
        sort: "fullName",
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
