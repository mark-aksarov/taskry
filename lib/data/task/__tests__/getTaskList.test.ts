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
import { getTaskList } from "../task.dal";
import { TaskFilters } from "@/lib/types";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll, afterEach, afterAll } from "vitest";

describe("getTaskList", () => {
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

  it("should return all tasks with valid TaskListDTO", async () => {
    // Arrange
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date("2023-01-01"),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
          assigneeId: "user-3",
        },
      ],
    });

    await prisma.subtask.createMany({
      data: [
        {
          id: 1,
          taskId: 1,
          text: "Subtask 1",
          isDone: false,
        },
        {
          id: 2,
          taskId: 1,
          text: "Subtask 2",
          isDone: true,
        },
      ],
    });

    await prisma.comment.createMany({
      data: [
        {
          id: 1,
          taskId: 1,
          content: "Comment 1",
          senderId: "user-1",
          workspaceId: 1,
        },
      ],
    });

    // Act
    const result = await getTaskList({
      page: 1,
      pageSize: 50,
      sort: "title",
    });

    await prisma.task.deleteMany();
    await prisma.subtask.deleteMany();
    await prisma.comment.deleteMany();

    // Assert
    expect(result).toStrictEqual({
      items: [
        {
          id: 1,
          title: "Task 1",
          status: TaskStatus.active,

          deadline: new Date("2023-01-01").toISOString(),
          assignee: {
            id: "user-3",
            fullName: "User 3",
            imageUrl: "/man.jpg",
          },
          project: {
            id: 1,
            title: "Project 1",
            status: ProjectStatus.active,
          },
          category: {
            id: 1,
            name: "Task Category 1",
          },
          subtasks: {
            total: 2,
            done: 1,
          },
          commentsCount: 1,
        },
      ],
      totalCount: 1,
    });
  });

  describe("sorting", () => {
    afterEach(async () => {
      await prisma.task.deleteMany();
    });

    it("should correctly sort tasks by title", async () => {
      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task B",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
          {
            id: 2,
            title: "Task C",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
          {
            id: 3,
            title: "Task A",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const result = await getTaskList({
        page: 1,
        pageSize: 50,
        sort: "title",
      });

      expect(result.items[0].title).toBe("Task A");
      expect(result.items[1].title).toBe("Task B");
      expect(result.items[2].title).toBe("Task C");
    });

    it("should correctly sort tasks by deadline", async () => {
      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task A",
            deadline: new Date("2023-01-02"),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
          {
            id: 2,
            title: "Task B",
            deadline: new Date("2023-01-03"),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
          {
            id: 3,
            title: "Task C",
            deadline: new Date("2023-01-01"),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const result = await getTaskList({
        page: 1,
        pageSize: 50,
        sort: "deadline",
      });

      expect(result.items[0].title).toBe("Task C");
      expect(result.items[1].title).toBe("Task A");
      expect(result.items[2].title).toBe("Task B");
    });

    it("should correctly sort tasks by status", async () => {
      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task A",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.pending,
            assigneeId: "user-3",
          },
          {
            id: 2,
            title: "Task B",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.completed,
            assigneeId: "user-3",
          },
          {
            id: 3,
            title: "Task C",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const result = await getTaskList({
        page: 1,
        pageSize: 50,
        sort: "status",
      });

      expect(result.items[0].title).toBe("Task C");
      expect(result.items[1].title).toBe("Task A");
      expect(result.items[2].title).toBe("Task B");
    });

    it("should correctly sort tasks by category", async () => {
      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task A",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.pending,
            assigneeId: "user-3",
          },
          {
            id: 2,
            title: "Task B",
            deadline: new Date(),
            projectId: 1,
            categoryId: 2,
            workspaceId: 1,
            status: TaskStatus.completed,
            assigneeId: "user-3",
          },
          {
            id: 3,
            title: "Task C",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const result = await getTaskList({
        page: 1,
        pageSize: 50,
        sort: "category",
      });

      expect(result.items[0].title).toBe("Task A");
      expect(result.items[1].title).toBe("Task C");
      expect(result.items[2].title).toBe("Task B");
    });
  });

  describe("filtering", () => {
    afterEach(async () => {
      await prisma.task.deleteMany();
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
            title: "Task AB",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
          {
            id: 3,
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

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: {
          query: "AB",
        },
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Task AB");
    });

    it("should filter tasks by status", async () => {
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
            status: TaskStatus.completed,
            assigneeId: "user-3",
          },
          {
            id: 3,
            title: "Task C",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.completed,
            assigneeId: "user-3",
          },
        ],
      });

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: {
          statuses: [TaskStatus.completed],
        },
      });

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      result.items.forEach((task) =>
        expect(task.status).toBe(TaskStatus.completed),
      );
    });

    describe("filter tasks by deadline", () => {
      async function setup(deadlines: Date[]) {
        await prisma.task.createMany({
          data: [
            {
              id: 1,
              title: "Task A",
              deadline: deadlines[0],
              projectId: 1,
              categoryId: 1,
              workspaceId: 1,
              status: TaskStatus.active,
              assigneeId: "user-3",
            },
            {
              id: 2,
              title: "Task B",
              deadline: deadlines[1],
              projectId: 1,
              categoryId: 1,
              workspaceId: 1,
              status: TaskStatus.completed,
              assigneeId: "user-3",
            },
            {
              id: 3,
              title: "Task C",
              deadline: deadlines[2],
              projectId: 1,
              categoryId: 1,
              workspaceId: 1,
              status: TaskStatus.completed,
              assigneeId: "user-3",
            },
          ],
        });
      }

      it("should filter tasks by deadline range", async () => {
        await setup([
          new Date("2023-01-01"),
          new Date("2023-01-02"),
          new Date("2023-01-03"),
        ]);

        const filters: TaskFilters = {
          deadlineFrom: "2023-01-01",
          deadlineTo: "2023-01-02",
        };

        const result = await getTaskList({
          page: 1,
          pageSize: 10,
          sort: "title",
          filters,
        });

        expect(result.items).toHaveLength(2);
        expect(result.totalCount).toBe(2);
        expect(result.items[0].title).toBe("Task A");
        expect(result.items[1].title).toBe("Task B");
      });
    });

    it("should filter tasks by specific project", async () => {
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
            projectId: 2,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const filters: TaskFilters = {
        projectIds: [1],
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Task A");
    });

    it("should filter tasks by specific task category", async () => {
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
            categoryId: 2,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const filters: TaskFilters = {
        categoryIds: [1],
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Task A");
    });

    it("should filter tasks by specific assignee", async () => {
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
            assigneeId: "user-4",
          },
        ],
      });

      const filters: TaskFilters = {
        assigneeIds: ["user-3"],
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Task A");
    });

    it("should filter only my tasks", async () => {
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
            assigneeId: "user-1",
          },
          {
            id: 2,
            title: "Task B",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-2",
          },
          {
            id: 3,
            title: "Task C",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-3",
          },
        ],
      });

      const filters: TaskFilters = {
        onlyMyTasks: true,
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Task A");
    });
  });

  describe("pagination", () => {
    beforeAll(async () => {
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
          {
            id: 3,
            title: "Task C",
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

    afterAll(async () => {
      await prisma.task.deleteMany();
    });

    it("should correctly handle pagination (page and pageSize)", async () => {
      const page1 = await getTaskList({
        page: 1,
        pageSize: 2,
        sort: "title",
      });
      const page2 = await getTaskList({
        page: 2,
        pageSize: 2,
        sort: "title",
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].title).toBe("Task A");
      expect(page1.items[1].title).toBe("Task B");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].title).toBe("Task C");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await getTaskList({
        page: 99,
        pageSize: 10,
        sort: "title",
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
