import {
  createTask,
  updateTask,
  getTaskList,
  getTaskCount,
  getTaskDetail,
  getTaskSummary,
  getTaskFormData,
  updateTaskStatuses,
  deleteTasks,
} from "../task.dal";

import prisma from "@/lib/prisma";
import * as mappers from "../task.mapper";
import { TaskFilters } from "../task.dto";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
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

describe("Task DAL", () => {
  beforeEach(async () => {
    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

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
      const mapperSpy = vi.spyOn(mappers, "mapTaskSummaryToDTO");

      await getTaskSummary(1);

      expect(getSessionOrThrow).toHaveBeenCalledTimes(1);
      expect(mapperSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "task-1, ws-1",
        }),
      );
    });

    it("should throw an error if the task belongs to a different workspace", async () => {
      await expect(getTaskSummary(3 * 3 + 1)).rejects.toThrow("Task not found");
    });

    it("should throw an error if the task does not exist at all", async () => {
      await expect(getTaskSummary(999999)).rejects.toThrow("Task not found");
    });
  });

  describe("getTaskDetail", () => {
    it("should return detailed task data for a valid ID in the current workspace", async () => {
      const result = await getTaskDetail(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.title).toBe("task-1, ws-1");
      expect(result.status).toBe("active");
      expect(result.category).toBeDefined();
      expect(result.category.name).toContain("task-category-1");
      expect(result.project).toBeDefined();
      expect(result.project.title).toContain("project-1, ws-1");
    });

    it("should throw 'Task not found' when attempting to access a task from another workspace", async () => {
      await expect(getTaskDetail(getTaskId(2, "active", 0))).rejects.toThrow(
        "Task not found",
      );
    });

    it("should throw an error if the task ID does not exist", async () => {
      const nonExistentId = 999;
      await expect(getTaskDetail(nonExistentId)).rejects.toThrow(
        "Task not found",
      );
    });
  });

  describe("getTaskFormData", () => {
    it("should return form data for an existing task in the current workspace", async () => {
      const taskId = getTaskId(1, "active", 0);

      const result = await getTaskFormData(taskId);

      expect(result).toBeDefined();
      expect(result.id).toBe(taskId);
      expect(result.title).toBe(`task-${taskId}, ws-${1}`);

      expect(result.status).toBe("active");
      expect(result.assigneeId).toBe(`user-${1}`);
    });

    it("should throw 'Task not found' error if the task belongs to another workspace", async () => {
      const taskId = getTaskId(2, "active", 0);

      await expect(getTaskFormData(taskId)).rejects.toThrow("Task not found");
    });

    it("should correctly return category and project data", async () => {
      const taskId = getTaskId(1, "pending", 1);

      const result = await getTaskFormData(taskId);

      expect(result.categoryId).toBeDefined();
      expect(result.projectId).toBe(getProjectId(1, "pending"));
    });

    it("should throw an error if the task ID does not exist", async () => {
      const invalidId = 99999;
      await expect(getTaskFormData(invalidId)).rejects.toThrow(
        "Task not found",
      );
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

  describe("getTaskCount", () => {
    it("should return the total count of tasks for the current workspace", async () => {
      const count = await getTaskCount();
      expect(count).toBe(9);
    });

    it("should return the correct count when filtering by status", async () => {
      const filters: TaskFilters = {
        status: ["active", "pending"],
        category: [],
        project: [],
        assignee: [],
      };

      const count = await getTaskCount(filters);

      expect(count).toBe(6);
    });

    it("should return the correct count for 'overdue' tasks", async () => {
      const filters: TaskFilters = {
        status: [],
        category: [],
        project: [],
        assignee: [],
        deadline: "overdue",
      };

      const count = await getTaskCount(filters);

      expect(count).toBe(3);
    });

    it("should return 0 when filters match tasks from a different workspace", async () => {
      const projectId = getProjectId(2, "active");
      const filters: TaskFilters = {
        status: [],
        category: [],
        project: [projectId],
        assignee: [],
      };

      const count = await getTaskCount(filters);

      expect(count).toBe(0);
    });

    it("should combine multiple filters correctly (status + project)", async () => {
      const projectId = getProjectId(1, "active");
      const filters: TaskFilters = {
        status: ["active"],
        category: [],
        project: [projectId],
        assignee: [],
      };

      const count = await getTaskCount(filters);

      expect(count).toBe(1);
    });
  });

  describe("createTask", () => {
    it("should successfully create a task with valid relations in the current workspace", async () => {
      const projectId = getProjectId(1, "active");
      const input = {
        id: 100,
        title: "New Integration Task",
        status: "active" as const,
        projectId: projectId,
        categoryId: 1,
        assigneeId: `user-1`,
        deadline: new Date(),
      };

      const result = await createTask(input);

      expect(result).toBeDefined();
      expect(result.title).toBe(input.title);
      expect(result.workspaceId).toBe(1);
      expect(result.creatorId).toBe("user-1");
      expect(result.projectId).toBe(projectId);
    });

    it("should fail if the project belongs to a different workspace", async () => {
      const projectId = getProjectId(2, "active");
      const input = {
        id: 100,
        title: "Invalid Workspace Task",
        status: "active" as const,
        projectId: projectId,
        categoryId: 1,
        assigneeId: `user-1`,
        deadline: new Date(),
      };

      await expect(createTask(input as any)).rejects.toThrow();
    });

    it("should fail if the assignee belongs to a different workspace", async () => {
      const input = {
        id: 100,
        title: "Foreign Assignee Task",
        status: "active" as const,
        projectId: getProjectId(1, "active"),
        categoryId: 1,
        assigneeId: `user-2`,
        deadline: new Date(),
      };

      await expect(createTask(input as any)).rejects.toThrow();
    });

    it("should create a task without optional fields", async () => {
      const input = {
        id: 100,
        title: "Minimal Task",
        status: "pending" as const,
        projectId: getProjectId(1, "pending"),
        categoryId: 1,
        deadline: new Date(),
      };

      const result = await createTask(input as any);

      expect(result.id).toBeDefined();
      expect(result.assigneeId).toBeNull();
    });
  });

  describe("updateTask", () => {
    it("should successfully update task fields within the same workspace", async () => {
      const taskId = getTaskId(1, "active", 1);
      const updateInput = {
        id: taskId,
        title: "Updated Task Title",
      };

      const result = await updateTask(updateInput);

      expect(result.id).toBe(taskId);
      expect(result.title).toBe("Updated Task Title");
    });

    it("should throw 'Task not found' when trying to update a task from another workspace", async () => {
      const taskId = getTaskId(2, "active", 0);
      const updateInput = {
        id: taskId,
        title: "Hacker Update",
      };

      await expect(updateTask(updateInput)).rejects.toThrow("Task not found");
    });

    it("should ignore status update if the project status is not allowed", async () => {
      const taskId = getTaskId(1, "completed", 0);
      const originalTask = await prisma.task.findUnique({
        where: { id: taskId },
      });

      const updateInput = {
        id: taskId,
        title: "Title still updates",
        status: "active" as const,
      };

      const result = await updateTask(updateInput);

      expect(result.title).toBe("Title still updates");
      expect(result.status).toBe(originalTask?.status);
    });

    it("should successfully update status when project status is allowed", async () => {
      const taskId = getTaskId(1, "active", 0);
      const updateInput = {
        id: taskId,
        status: "pending" as const,
      };

      const result = await updateTask(updateInput);

      expect(result.status).toBe("pending");
    });

    it("should fail if updated relations belong to another workspace", async () => {
      const taskId = getTaskId(1, "active", 0);
      const projectId = getProjectId(2, "active");

      const updateInput = {
        id: taskId,
        projectId,
      };

      await expect(updateTask(updateInput)).rejects.toThrow();
    });
  });

  describe("updateTaskStatuses", () => {
    it("should update multiple tasks when they are in the current workspace and have allowed project statuses", async () => {
      const taskIds = [getTaskId(1, "active", 0), getTaskId(1, "active", 1)];
      const nextStatus = "completed" as const;

      const count = await updateTaskStatuses(taskIds, nextStatus);

      expect(count).toBe(2);

      const updatedTasks = await prisma.task.findMany({
        where: { id: { in: taskIds } },
      });
      updatedTasks.forEach((t) => expect(t.status).toBe(nextStatus));
    });

    it("should return count 0 when attempting to update tasks from a different workspace", async () => {
      const taskIds = [getTaskId(2, "active", 0), getTaskId(2, "active", 1)];

      const count = await updateTaskStatuses(taskIds, "completed");

      expect(count).toBe(0);
    });

    it("should not update tasks if their parent project status is not allowed", async () => {
      const taskId = getTaskId(1, "completed", 0);
      const taskBefore = await prisma.task.findUnique({
        where: { id: taskId },
      });

      const count = await updateTaskStatuses([taskId], "active");

      expect(count).toBe(0);
      const taskAfter = await prisma.task.findUnique({
        where: { id: taskId },
      });
      expect(taskAfter?.status).toBe(taskBefore?.status);
    });

    it("should partially update only the valid tasks in a mixed list", async () => {
      const validId = getTaskId(1, "active", 0);
      const invalidId = getTaskId(2, "active", 0);

      const count = await updateTaskStatuses([validId, invalidId], "pending");

      expect(count).toBe(1);
    });
  });

  describe("deleteTasks", () => {
    it("should successfully delete multiple tasks in the current workspace and return the count", async () => {
      const id1 = getTaskId(1, "active", 0);
      const id2 = getTaskId(1, "active", 1);
      const idsToDelete = [id1, id2];

      const count = await deleteTasks(idsToDelete);

      expect(count).toBe(2);

      const remainingTasks = await prisma.task.findMany({
        where: { id: { in: idsToDelete } },
      });
      expect(remainingTasks).toHaveLength(0);
    });

    it("should return count 0 when attempting to delete tasks from a different workspace", async () => {
      const ws2Ids = [getTaskId(2, "active", 0)];

      const count = await deleteTasks(ws2Ids);

      expect(count).toBe(0);
    });

    it("should only delete tasks belonging to the current workspace in a mixed list", async () => {
      const validId = getTaskId(1, "pending", 0);
      const invalidId = getTaskId(2, "pending", 0);
      const mixedIds = [validId, invalidId];

      const count = await deleteTasks(mixedIds);

      expect(count).toBe(1);

      const task = await prisma.task.findUnique({
        where: { id: invalidId },
      });
      expect(task).toBeDefined();
    });

    it("should return 0 if an empty array is provided", async () => {
      const count = await deleteTasks([]);
      expect(count).toBe(0);
    });
  });
});
