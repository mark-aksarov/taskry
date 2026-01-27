import {
  it,
  vi,
  expect,
  describe,
  afterAll,
  beforeAll,
  afterEach,
  beforeEach,
} from "vitest";

import {
  getProjectList,
  getProjectDetail,
  getProjectSummary,
  getProjectFormData,
  getProjectSummaries,
  searchProjects,
} from "../project.service";

import prisma from "@/lib/prisma";
import { ProjectFilters } from "@/lib/types";
import { dates } from "@/lib/data/utils/test-utils";
import { resetDatabase } from "@/prisma/resetDatabase";
import { verifySession } from "@/lib/data/utils/verifySession";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Project Service", () => {
  beforeAll(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.create({
      data: {
        id: 1,
      },
    });

    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          imageUrl: "https://example.com/user-1.jpg",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          imageUrl: "https://example.com/user-2.jpg",
          workspaceId: 1,
        },
      ],
    });

    await prisma.company.create({
      data: {
        id: 1,
        name: "Company 1",
        workspaceId: 1,
      },
    });

    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          imageUrl: "https://example.com/customer-1.jpg",
          workspaceId: 1,
          companyId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          imageUrl: "https://example.com/customer-1.jpg",
          workspaceId: 1,
          companyId: 1,
        },
      ],
    });

    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Project Category 2",
          workspaceId: 1,
        },
      ],
    });
  });

  describe("project fetching by id", () => {
    beforeAll(async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project 1",
            description: "Description 1",
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
            description: "Description 2",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
        ],
      });

      await prisma.attachment.createMany({
        data: [
          {
            id: 1,
            projectId: 1,
            fileName: "Attachment 1",
            fileUrl: "https://example.com/attachment-1.jpg",
            workspaceId: 1,
          },
          {
            id: 2,
            projectId: 1,
            fileName: "Attachment 2",
            fileUrl: "https://example.com/attachment-2.jpg",
            workspaceId: 1,
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.project.deleteMany();
    });

    it("should return a valid ProjectSummaryDTO", async () => {
      const result = await getProjectSummary(1);
      expect(result).toStrictEqual({ id: 1, title: "Project 1" });
    });

    it("should return a valid ProjectFormDataDTO", async () => {
      const result = await getProjectFormData(1);

      expect(result).toBeDefined();
      expect(result).toStrictEqual({
        id: 1,
        title: "Project 1",
        description: "Description 1",
        deadline: new Date("2025-03-01"),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      });
    });

    it("should return a valid ProjectDetailDTO", async () => {
      const result = await getProjectDetail(1);

      expect(result).toStrictEqual({
        id: 1,
        title: "Project 1",
        description: "Description 1",
        deadline: new Date("2025-03-01"),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,

        creator: {
          id: "user-1",
          fullName: "User 1",
          imageUrl: "https://example.com/user-1.jpg",
        },

        customer: {
          id: 1,
          fullName: "Customer 1",
        },

        category: {
          id: 1,
          name: "Project Category 1",
        },

        attachments: [
          {
            id: 1,
            fileName: "Attachment 1",
            fileUrl: "https://example.com/attachment-1.jpg",
          },
          {
            id: 2,
            fileName: "Attachment 2",
            fileUrl: "https://example.com/attachment-2.jpg",
          },
        ],
      });
    });

    it.each([
      { name: "getProjectSummary", method: getProjectSummary },
      { name: "getProjectDetail", method: getProjectDetail },
      { name: "getProjectFormData", method: getProjectFormData },
    ])("should return null by $name", async ({ method }) => {
      const failure = await method(999);
      expect(failure).toBeNull();
    });
  });

  it("should return all projects by getProjectSummaries", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          title: "Project 1",
          description: "Description 1",
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
          description: "Description 2",
          deadline: new Date("2025-05-15"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.completed,
        },
      ],
    });

    const result = await getProjectSummaries();
    await prisma.project.deleteMany();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Project 1");
    expect(result[1].title).toBe("Project 2");
  });

  describe("getProjectList", () => {
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
            deadline: new Date("2025-03-01"),

            creator: {
              id: "user-1",
              fullName: "User 1",
              imageUrl: "https://example.com/user-1.jpg",
            },

            category: {
              id: 1,
              name: "Project Category 1",
            },

            customer: {
              id: 1,
              fullName: "Customer 1",
              imageUrl: "https://example.com/customer-1.jpg",
              company: {
                id: 1,
                name: "Company 1",
              },
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

      it("should correctly sort projects by category", async () => {
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
              categoryId: 2,
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
          sort: "category",
        });

        expect(result.items[0].title).toBe("Project A");
        expect(result.items[1].title).toBe("Project C");
        expect(result.items[2].title).toBe("Project B");
      });
    });

    describe("filtering", () => {
      afterEach(async () => {
        await prisma.project.deleteMany();
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
          sort: "fullName",
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
            status: [ProjectStatus.completed],
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
            deadlineFrom: new Date("2023-01-01"),
            deadlineTo: new Date("2023-01-02"),
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
          customer: [1],
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
          user: ["user-1"],
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
          category: [1],
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

  describe("searchProjects", () => {
    afterEach(async () => {
      await prisma.project.deleteMany();
    });

    it("should return all projects with valid ProjectSearchDTO", async () => {
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
        ],
      });

      const result = await searchProjects({
        page: 1,
        pageSize: 10,
      });

      expect(result).toStrictEqual({
        items: [
          {
            id: 1,
            title: "Project A",
            deadline: new Date("2025-03-01"),
          },
        ],
        totalCount: 1,
      });
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
            title: "Project B",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 2,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      const result = await searchProjects({
        page: 1,
        pageSize: 10,
        query: "Project A",
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe("Project A");
    });

    describe("pagination", () => {
      beforeEach(async () => {
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
              status: ProjectStatus.completed,
            },
            {
              id: 2,
              workspaceId: 1,
              title: "Project 2",
              deadline: new Date("2025-05-15"),
              creatorId: "user-1",
              categoryId: 1,
              customerId: 1,
              status: ProjectStatus.active,
            },
            {
              id: 3,
              workspaceId: 1,
              title: "Project 3",
              deadline: new Date("2025-07-18"),
              creatorId: "user-1",
              categoryId: 1,
              customerId: 1,
              status: ProjectStatus.active,
            },
          ],
        });
      });

      it("should handle pagination correctly (page and pageSize)", async () => {
        const page1 = await searchProjects({
          page: 1,
          pageSize: 2,
        });

        const page2 = await searchProjects({
          page: 2,
          pageSize: 2,
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
        const result = await searchProjects({
          page: 99,
          pageSize: 10,
        });

        expect(result.items).toEqual([]);
        expect(result.totalCount).toBe(3);
      });
    });
  });
});
