import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { ProjectFilters } from "@/lib/types";
import { getProjectList } from "../project.dal";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll, afterEach, afterAll } from "vitest";

describe("getProjectList", () => {
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
    });
  });

  it("should return a valid ProjectListDTO", async () => {
    await prisma.project.create({
      data: {
        id: 1,
        description: "Description 1",
        workspaceId: 1,
        title: "Project 1",
        deadline: new Date("2025-03-01"),
        creatorId: "user-1",
        categoryId: 1,
        customerId: 1,
        status: ProjectStatus.active,
      },
    });

    await prisma.comment.create({
      data: {
        id: 1,
        projectId: 1,
        workspaceId: 1,
        senderId: "user-1",
        content: "Comment 1",
      },
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
          status: TaskStatus.active,
          assigneeId: "user-1",
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.completed,
          assigneeId: "user-1",
        },
      ],
    });

    const result = await getProjectList({
      page: 1,
      pageSize: 10,
      sort: "title",
    });

    await prisma.task.deleteMany();
    await prisma.taskCategory.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.project.deleteMany();

    expect(result).toStrictEqual({
      items: [
        {
          id: 1,
          title: "Project 1",
          status: ProjectStatus.active,
          deadline: new Date("2025-03-01").toISOString(),

          creator: {
            id: "user-1",
            fullName: "User 1",
            imageUrl: "/man.jpg",
          },

          category: {
            id: 1,
            name: "Project Category 1",
          },

          customer: {
            id: 1,
            fullName: "Customer 1",
            imageUrl: "/man.jpg",
          },

          company: {
            id: 1,
            name: "Company 1",
          },

          commentsCount: 1,

          tasks: {
            total: 2,
            completed: 1,
          },
        },
      ],
      totalCount: 1,
    });
  });

  it("should return an empty array if no projects", async () => {
    const result = await getProjectList({
      page: 1,
      pageSize: 10,
      sort: "title",
    });

    expect(result.items).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });

  it("should return all projects", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          title: "Project 1",
          deadline: new Date("2025-03-01"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          workspaceId: 1,
          title: "Project 2",
          deadline: new Date("2025-05-15"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.pending,
        },
      ],
    });

    const result = await getProjectList({
      page: 1,
      pageSize: 10,
      sort: "title",
    });
    await prisma.project.deleteMany();

    expect(result.items).toHaveLength(2);
    expect(result.items[0].title).toBe("Project 1");
    expect(result.items[1].title).toBe("Project 2");
  });

  describe("sorting", () => {
    afterEach(async () => {
      await prisma.project.deleteMany();
    });

    it("should correctly sort projects by title", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project C",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.pending,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.pending,
          },
        ],
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 50,
        sort: "title",
      });

      expect(result.items[0].title).toBe("Project A");
      expect(result.items[1].title).toBe("Project B");
      expect(result.items[2].title).toBe("Project C");
    });

    it("should correctly sort projects by deadline", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2023-01-02"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2023-01-03"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.pending,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project C",
            deadline: new Date("2023-01-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.pending,
          },
        ],
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 50,
        sort: "deadline",
      });

      expect(result.items[0].title).toBe("Project C");
      expect(result.items[1].title).toBe("Project A");
      expect(result.items[2].title).toBe("Project B");
    });

    it("should correctly sort projects by status", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date(),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.pending,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date(),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project C",
            deadline: new Date(),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 50,
        sort: "status",
      });

      expect(result.items[0].title).toBe("Project C");
      expect(result.items[1].title).toBe("Project A");
      expect(result.items[2].title).toBe("Project B");
    });
  });

  describe("filtering", () => {
    afterEach(async () => {
      await prisma.project.deleteMany();
    });

    it("should filter projects by query", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project AB",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 2,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 2,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: { query: "AB" },
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Project AB");
    });

    it("should filter projects which have not active tasks", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Category A",
          workspaceId: 1,
        },
      });

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
            projectId: 2,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.pending,
            assigneeId: "user-1",
          },
        ],
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: { noActiveTasks: true },
      });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.items[0].title).toBe("Project B");
    });

    it("should filter projects by status", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project C",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
        ],
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: {
          statuses: [ProjectStatus.completed],
        },
      });

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      result.items.forEach((project) =>
        expect(project.status).toBe(ProjectStatus.completed),
      );
    });

    describe("filter by deadline", () => {
      async function setup(deadlines: Date[]) {
        await prisma.project.createMany({
          data: [
            {
              id: 1,
              workspaceId: 1,
              title: "Project A",
              deadline: deadlines[0],
              creatorId: "user-1",
              categoryId: 1,
              customerId: 1,
              status: ProjectStatus.active,
            },
            {
              id: 2,
              workspaceId: 1,
              title: "Project B",
              deadline: deadlines[1],
              creatorId: "user-1",
              categoryId: 1,
              customerId: 1,
              status: ProjectStatus.completed,
            },
            {
              id: 3,
              workspaceId: 1,
              title: "Project C",
              deadline: deadlines[2],
              creatorId: "user-1",
              categoryId: 1,
              customerId: 1,
              status: ProjectStatus.completed,
            },
          ],
        });
      }

      it("should filter projects by deadline range", async () => {
        await setup([
          new Date("2023-01-01"),
          new Date("2023-01-02"),
          new Date("2023-01-03"),
        ]);

        const filters: ProjectFilters = {
          deadlineFrom: "2023-01-01",
          deadlineTo: "2023-01-02",
        };

        const result = await getProjectList({
          page: 1,
          pageSize: 10,
          sort: "title",
          filters,
        });

        expect(result.items).toHaveLength(2);
        expect(result.totalCount).toBe(2);
        expect(result.items[0].title).toBe("Project A");
        expect(result.items[1].title).toBe("Project B");
      });
    });

    it("should filter projects by customer", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 2,
            status: ProjectStatus.active,
          },
        ],
      });

      const filters: ProjectFilters = {
        customerIds: [1],
      };

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Project A");
    });

    it("should filter projects by user", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-2",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      const filters: ProjectFilters = {
        creatorIds: ["user-1"],
      };

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Project A");
    });

    it("should filter projects by category", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 2,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      const filters: ProjectFilters = {
        categoryIds: [1],
      };

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Project A");
    });
  });

  describe("pagination", () => {
    beforeAll(async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project 1",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project 2",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.pending,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project 3",
            deadline: new Date("2025-07-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.project.deleteMany();
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await getProjectList({
        page: 1,
        pageSize: 2,
        sort: "title",
      });

      const page2 = await getProjectList({
        page: 2,
        pageSize: 2,
        sort: "title",
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].title).toBe("Project 1");
      expect(page1.items[1].title).toBe("Project 2");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].title).toBe("Project 3");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await getProjectList({
        page: 99,
        pageSize: 10,
        sort: "title",
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
