import {
  searchTasks,
  getTaskList,
  getTaskDetail,
  getTaskSummary,
  getTaskFormData,
} from "../task.service";

import {
  vi,
  it,
  expect,
  describe,
  afterAll,
  beforeAll,
  afterEach,
  beforeEach,
} from "vitest";

import prisma from "@/lib/prisma";
import { TaskFilters } from "@/lib/types";
import { dates } from "@/lib/data/utils/test-utils";
import { resetDatabase } from "@/prisma/resetDatabase";
import { verifySession } from "@/lib/data/utils/verifySession";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Task Service", () => {
  beforeAll(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }] });

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
          role: "manager",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
          role: "guest",
          workspaceId: 1,
        },
      ],
    });

    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 1 },
      ],
    });

    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 1 },
      ],
    });

    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 1 },
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
          companyId: 2,
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
        {
          id: 2,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
      ],
    });
  });

  describe("task fetching by id", () => {
    beforeAll(async () => {
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
            projectId: 2,
            categoryId: 2,
            workspaceId: 1,
            status: TaskStatus.active,
            assigneeId: "user-2",
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.task.deleteMany();
    });

    it.each([
      { name: "getTaskSummary", method: getTaskSummary },
      { name: "getTaskDetail", method: getTaskDetail },
      { name: "getTaskFormData", method: getTaskFormData },
    ])("should successfully return task by $name", async ({ method }) => {
      const success = await method(1);
      expect(success).toMatchObject({ id: 1 });
    });

    it.each([
      { name: "getTaskSummary", method: getTaskSummary },
      { name: "getTaskDetail", method: getTaskDetail },
      { name: "getTaskFormData", method: getTaskFormData },
    ])("should return null by $name", async ({ method }) => {
      const failure = await method(999);
      expect(failure).toBeNull();
    });
  });

  describe("getTaskList", () => {
    it("should return all tasks", async () => {
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
        ],
      });

      const result = await getTaskList({
        page: 1,
        pageSize: 50,
        sort: "title",
      });
      await prisma.task.deleteMany();

      expect(result.items).toHaveLength(2);
      expect(result.totalCount).toBe(2);
      expect(result.items[0].title).toBe("Task 1");
      expect(result.items[1].title).toBe("Task 2");
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
            status: [TaskStatus.completed],
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

        it("should filter tasks by 'overdue' deadline", async () => {
          await setup([dates.overdue, dates.today, dates.tomorrow]);

          const filters: TaskFilters = {
            deadline: "overdue",
          };

          const result = await getTaskList({
            page: 1,
            pageSize: 10,
            sort: "title",
            filters,
          });

          expect(result.items).toHaveLength(1);
          expect(result.totalCount).toBe(1);
          expect(result.items[0].title).toBe("Task A");
        });

        it("should filter tasks by 'today' deadline", async () => {
          await setup([dates.overdue, dates.today, dates.tomorrow]);

          const filters: TaskFilters = {
            deadline: "today",
          };

          const result = await getTaskList({
            page: 1,
            pageSize: 10,
            sort: "title",
            filters,
          });

          expect(result.items).toHaveLength(1);
          expect(result.totalCount).toBe(1);
          expect(result.items[0].title).toBe("Task B");
        });

        it("should filter tasks by 'tomorrow' deadline", async () => {
          await setup([dates.overdue, dates.today, dates.tomorrow]);

          const filters: TaskFilters = {
            deadline: "tomorrow",
          };

          const result = await getTaskList({
            page: 1,
            pageSize: 10,
            sort: "title",
            filters,
          });

          expect(result.items).toHaveLength(1);
          expect(result.totalCount).toBe(1);
          expect(result.items[0].title).toBe("Task C");
        });

        it("should filter tasks by 'thisWeek' deadline", async () => {
          await setup([dates.prevWeek, dates.today, dates.nextWeek]);

          const filters: TaskFilters = {
            deadline: "thisWeek",
          };

          const result = await getTaskList({
            page: 1,
            pageSize: 10,
            sort: "title",
            filters,
          });

          expect(result.items).toHaveLength(1);
          expect(result.totalCount).toBe(1);
          expect(result.items[0].title).toBe("Task B");
        });

        it("should filter tasks by deadline range", async () => {
          await setup([
            new Date("2023-01-01"),
            new Date("2023-01-02"),
            new Date("2023-01-03"),
          ]);

          const filters: TaskFilters = {
            dateStart: "2023-01-01",
            dateEnd: "2023-01-02",
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
          project: [1],
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
          category: [1],
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
          assignee: ["user-3"],
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

  describe("searchTasks", () => {
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
            deadline: new Date("2025-03-01"),
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
});
