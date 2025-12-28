import {
  getTaskList,
  getTaskDetail,
  getTaskSummary,
  getTaskFormData,
} from "../task.service";

import prisma from "@/lib/prisma";
import { TaskFilters } from "@/lib/types";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

const statuses = ["active", "pending", "completed"];

export const getProjectId = (workspaceId: number, status: string) => {
  const pIndex = statuses.indexOf(status);
  return (workspaceId - 1) * statuses.length + pIndex + 1;
};

export const getTaskId = (
  workspaceId: number,
  projectStatus: string,
  tIndex: number,
) => {
  const projectId = getProjectId(workspaceId, projectStatus);
  return (projectId - 1) * statuses.length + tIndex + 1;
};

describe("Task Service", () => {
  beforeEach(async () => {
    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (verifySession as any).mockResolvedValue(mockSession);

    await resetDatabase();

    for (const n of [1, 2]) {
      // Create Workspace
      await prisma.workspace.create({
        data: { id: n },
      });

      // Create User & Position
      await prisma.position.create({
        data: { id: n, name: `Position ${n}`, workspaceId: n },
      });

      await prisma.user.create({
        data: {
          id: `user-${n}`,
          workspaceId: n,
          fullName: `User ${n}`,
          positionId: n,
          email: `user-${n}@ws${n}.com`,
        },
      });

      // Create Company & Customer
      await prisma.company.create({
        data: { id: n, name: `Company ${n}`, workspaceId: n },
      });

      await prisma.customer.create({
        data: {
          id: n,
          fullName: `Customer ${n}`,
          email: `customer-${n}@ws${n}.com`,
          companyId: n,
          workspaceId: n,
        },
      });

      // Create 2 Project Categories and 2 Task Categories per Workspace
      const projectCats = await Promise.all([
        prisma.projectCategory.create({
          data: {
            id: (n - 1) * 2 + 1,
            name: `project-category-1 - ws-${n}`,
            workspaceId: n,
          },
        }),
        prisma.projectCategory.create({
          data: {
            id: (n - 1) * 2 + 2,
            name: `project-category-2 - ws-${n}`,
            workspaceId: n,
          },
        }),
      ]);

      const taskCats = await Promise.all([
        prisma.taskCategory.create({
          data: {
            id: (n - 1) * 2 + 1,
            name: `task-category-1 - ws-${n}`,
            workspaceId: n,
          },
        }),
        prisma.taskCategory.create({
          data: {
            id: (n - 1) * 2 + 2,
            name: `task-category-2 - ws-${n}`,
            workspaceId: n,
          },
        }),
      ]);

      const now = new Date();

      const dates = {
        overdue: new Date(new Date().setDate(now.getDate() - 5)),
        today: new Date(new Date(now).setHours(23)),
        tomorrow: new Date(new Date().setDate(now.getDate() + 1)),
        thisWeek: new Date(new Date().setDate(now.getDate() + 3)),
        nextWeek: new Date(new Date().setDate(now.getDate() + 8)),
      };
      const dateKeys = Object.keys(dates) as (keyof typeof dates)[];

      // Create Projects (Active, Pending, Completed)
      for (const [pIndex, status] of statuses.entries()) {
        const projectId = getProjectId(n, status);

        const project = await prisma.project.create({
          data: {
            id: projectId,
            title: `project-${projectId}, ws-${n}`,
            deadline: new Date(new Date().setDate(now.getDate() + 10)),
            status: status as ProjectStatus,
            workspaceId: n,
            categoryId: projectCats[pIndex % 2].id,
            customerId: n,
          },
        });

        // Create 3 Tasks per Project (Active, Pending, Completed)
        for (const [tIndex, taskStatus] of statuses.entries()) {
          const taskId = getTaskId(n, status, tIndex);

          let selectedDateKey: (typeof dateKeys)[number];

          // Workspace 1
          if (n === 1) {
            if (tIndex === 0) selectedDateKey = "overdue";
            else if (tIndex === 1) selectedDateKey = "today";
            else selectedDateKey = "tomorrow";
          }
          // Workspace 2
          else {
            if (tIndex === 0) selectedDateKey = "tomorrow";
            else if (tIndex === 1) selectedDateKey = "thisWeek";
            else selectedDateKey = "nextWeek";
          }

          const selectedDeadline = dates[selectedDateKey];

          await prisma.task.create({
            data: {
              id: taskId,
              title: `task-${taskId}, ws-${n}`,
              deadline: selectedDeadline,
              status: taskStatus as TaskStatus,
              projectId: project.id,
              workspaceId: n,
              categoryId: taskCats[tIndex % 2].id,
              assigneeId: `user-${n}`,
            },
          });
        }
      }
    }
  });

  describe("getTaskSummary", () => {
    it("should successfully return a task summary for a task in the current workspace", async () => {
      const task = await getTaskSummary(1);

      expect(verifySession).toHaveBeenCalledTimes(1);
      expect(task).toMatchObject({
        id: 1,
        title: "task-1, ws-1",
      });
    });

    it("should return null if the task belongs to a different workspace", async () => {
      const task = await getTaskSummary(3 * 3 + 1);
      expect(task).toBeNull();
    });

    it("should throw an error if the task does not exist at all", async () => {
      const task = await getTaskSummary(999999);
      expect(task).toBeNull();
    });
  });

  describe("getTaskDetail", () => {
    it("should return detailed task data for a valid ID in the current workspace", async () => {
      const result = await getTaskDetail(1);

      expect(result).toBeDefined();

      expect(result).toMatchObject({
        id: 1,
        title: "task-1, ws-1",
        status: "active",
        category: {
          id: 1,
        },
        project: {
          id: 1,
        },
      });
    });

    it("should return null when attempting to access a task from another workspace", async () => {
      const result = await getTaskDetail(getTaskId(2, "active", 0));
      expect(result).toBeNull();
    });

    it("should return null if the task ID does not exist", async () => {
      const result = await getTaskDetail(999);
      expect(result).toBeNull();
    });
  });

  describe("getTaskFormData", () => {
    it("should return form data for an existing task in the current workspace", async () => {
      const taskId = getTaskId(1, "active", 0);

      const result = await getTaskFormData(taskId);

      expect(result).toBeDefined();
      expect(result).toMatchObject({
        id: taskId,
        title: `task-${taskId}, ws-${1}`,
        status: "active",
        assigneeId: `user-${1}`,
      });
    });

    it("should return null error if the task belongs to another workspace", async () => {
      const taskId = getTaskId(2, "active", 0);
      const result = await getTaskFormData(taskId);
      expect(result).toBeNull();
    });

    it("should correctly return category and project data", async () => {
      const taskId = getTaskId(1, "active", 0);

      const result = await getTaskFormData(taskId);

      expect(result).toMatchObject({
        categoryId: 1,
        projectId: getProjectId(1, "active"),
      });
    });

    it("should return null if the task ID does not exist", async () => {
      const task = await getTaskFormData(9999);
      expect(task).toBeNull();
    });
  });

  describe("getTaskList", () => {
    it("should return only tasks belonging to the current workspace", async () => {
      const result = await getTaskList({
        page: 1,
        pageSize: 50,
        sort: "title",
      });

      expect(result).toHaveLength(9);
      result.forEach((task) => {
        expect(task.title).toContain("ws-1");
      });
    });

    it("should correctly handle pagination (page and pageSize)", async () => {
      const page1 = await getTaskList({ page: 1, pageSize: 5, sort: "title" });
      const page2 = await getTaskList({ page: 2, pageSize: 5, sort: "title" });

      expect(page1).toHaveLength(5);
      expect(page2).toHaveLength(4);

      const page1Ids = page1.map((t) => t.id);
      page2.forEach((task) => {
        expect(page1Ids).not.toContain(task.id);
      });
    });

    it("should filter tasks by status", async () => {
      const filters: TaskFilters = {
        status: [TaskStatus.completed],
        category: [],
        project: [],
        assignee: [],
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result).toHaveLength(3);
      result.forEach((task) => expect(task.status).toBe("completed"));
    });

    it("should filter tasks by 'overdue' deadline for Workspace 1", async () => {
      const filters: TaskFilters = {
        status: [],
        category: [],
        project: [],
        assignee: [],
        deadline: "overdue",
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result).toHaveLength(3);
    });

    it("should filter by specific project ID", async () => {
      const projectId = getProjectId(1, "active");
      const filters: TaskFilters = {
        status: [],
        category: [],
        project: [projectId],
        assignee: [],
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result).toHaveLength(3);
      result.forEach((task) => {
        expect(task.project.id).toBe(projectId);
      });
    });

    it("should return an empty list if no tasks match filters", async () => {
      const projectId = getProjectId(2, "active");
      const filters: TaskFilters = {
        status: [],
        category: [],
        project: [projectId],
        assignee: [],
      };

      const result = await getTaskList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters,
      });

      expect(result).toHaveLength(0);
    });
  });
});
