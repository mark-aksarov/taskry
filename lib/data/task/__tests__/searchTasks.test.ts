import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { searchTasks } from "../task.dal";
import { seed } from "@/prisma/test-utils/seed";
import { TaskStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeEach, beforeAll, afterEach } from "vitest";

describe("searchTasks", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      customers,
      taskCategories,
      projectCategories,
      projects,
    });
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
  });

  it("should return all tasks with valid TaskSearchDTO", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task A",
          deadline: new Date("2025-03-01"),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
          assigneeId: "user-3",
        },
      ],
    });

    const result = await searchTasks({
      page: 1,
      pageSize: 10,
    });

    expect(result).toStrictEqual({
      items: [
        {
          id: 1,
          title: "Task A",
          deadline: new Date("2025-03-01").toISOString(),
        },
      ],
      totalCount: 1,
    });
  });

  it("should filter tasks by query", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task A",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
          assigneeId: "user-3",
        },
        {
          id: 2,
          title: "Task B",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
          assigneeId: "user-3",
        },
      ],
    });

    const result = await searchTasks({
      page: 1,
      pageSize: 10,
      query: "Task A",
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].title).toBe("Task A");
  });

  describe("pagination", () => {
    beforeEach(async () => {
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
            assigneeId: "user-3",
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
          {
            id: 3,
            title: "Task 3",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await searchTasks({
        page: 1,
        pageSize: 2,
      });

      const page2 = await searchTasks({
        page: 2,
        pageSize: 2,
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].title).toBe("Task 1");
      expect(page1.items[1].title).toBe("Task 2");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].title).toBe("Task 3");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await searchTasks({
        page: 99,
        pageSize: 10,
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
