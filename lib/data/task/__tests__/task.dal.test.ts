import {
  createTask,
  updateTask,
  deleteTasks,
  updateTasks,
  getTaskCount,
} from "../task.dal";

import prisma from "@/lib/prisma";
import { TaskFilters } from "@/lib/types";
import { AccessDeniedError } from "@/lib/data/utils/error";
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

describe("Task DAL", () => {
  beforeEach(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

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

    describe("Task RBAC Creation", () => {
      const createTestCases = [
        { role: "admin", expected: "allow" },
        { role: "owner", expected: "allow" },
        { role: "manager", expected: "allow" },
        { role: "user", expected: "deny" },
        { role: "guest", expected: "deny" },
      ];

      it.each(createTestCases)(
        "should $expected task creation for role: $role",
        async ({ role, expected }) => {
          await prisma.user.update({
            where: { id: "user-1" },
            data: { role },
          });

          const input = {
            id: 100,
            title: "RBAC Test Task",
            status: "active" as const,
            projectId: getProjectId(1, "active"),
            categoryId: 1,
            assigneeId: `user-1`,
            deadline: new Date(),
          };

          if (expected === "allow") {
            const result = await createTask(input as any);
            expect(result).toBeDefined();
            expect(result.title).toBe(input.title);
          } else {
            await expect(createTask(input as any)).rejects.toThrow(
              AccessDeniedError,
            );
          }
        },
      );
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

      expect(result).not.toBeNull();
      expect(result?.id).toBe(taskId);
      expect(result?.title).toBe("Updated Task Title");
    });

    it("should return null when trying to update a task from another workspace", async () => {
      // Current implementation returns null if !existingTask
      const taskId = getTaskId(2, "active", 0);
      const updateInput = {
        id: taskId,
        title: "Hacker Update",
      };

      const result = await updateTask(updateInput);

      expect(result).toBeNull();
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

      expect(result?.title).toBe("Title still updates");
      expect(result?.status).toBe(originalTask?.status);
    });

    it("should successfully update status when project status is allowed", async () => {
      const taskId = getTaskId(1, "active", 0);
      const updateInput = {
        id: taskId,
        status: "pending" as const,
      };

      const result = await updateTask(updateInput);

      expect(result?.status).toBe("pending");
    });

    it("should fail if updated relations (like project) belong to another workspace", async () => {
      const taskId = getTaskId(1, "active", 0);
      const projectId = getProjectId(2, "active");

      const updateInput = {
        id: taskId,
        projectId,
      };

      await expect(updateTask(updateInput)).rejects.toThrow();
    });

    describe("Task RBAC Updating", () => {
      const updateTestCases = [
        { role: "admin", expected: "allow" },
        { role: "owner", expected: "allow" },
        { role: "manager", expected: "allow" },
        { role: "user", expected: "deny" },
        { role: "guest", expected: "deny" },
      ];

      it.each(updateTestCases)(
        "should $expected update for role: $role",
        async ({ role, expected }) => {
          await prisma.user.update({
            where: { id: "user-1" },
            data: { role },
          });

          const taskId = getTaskId(1, "active", 0);
          const input = {
            id: taskId,
            title: "Updated Title",
          };

          if (expected === "allow") {
            const result = await updateTask(input);
            expect(result).not.toBeNull();
            expect(result?.title).toBe("Updated Title");
          } else {
            await expect(updateTask(input)).rejects.toThrow(AccessDeniedError);
          }
        },
      );
    });
  });

  describe("updateTasks", () => {
    it("should update multiple tasks when they are in the current workspace and have allowed project statuses", async () => {
      const taskIds = [getTaskId(1, "active", 0), getTaskId(1, "active", 1)];
      const nextStatus = "completed" as const;

      const result = await updateTasks(taskIds, nextStatus);

      expect(result.count).toBe(2);

      const updatedTasks = await prisma.task.findMany({
        where: { id: { in: taskIds } },
      });
      updatedTasks.forEach((t) => expect(t.status).toBe(nextStatus));
    });

    it("should return count 0 when attempting to update tasks from a different workspace", async () => {
      const taskIds = [getTaskId(2, "active", 0), getTaskId(2, "active", 1)];

      const result = await updateTasks(taskIds, "completed");

      expect(result.count).toBe(0);
    });

    it("should not update tasks if their parent project status is not allowed", async () => {
      const taskId = getTaskId(1, "completed", 0);
      const taskBefore = await prisma.task.findUnique({
        where: { id: taskId },
      });

      const result = await updateTasks([taskId], "active");

      expect(result.count).toBe(0);

      const taskAfter = await prisma.task.findUnique({
        where: { id: taskId },
      });
      expect(taskAfter?.status).toBe(taskBefore?.status);
    });

    it("should partially update only the valid tasks in a mixed list", async () => {
      const validId = getTaskId(1, "active", 0);
      const invalidId = getTaskId(2, "active", 0);

      const result = await updateTasks([validId, invalidId], "pending");

      expect(result.count).toBe(1);

      const updatedTask = await prisma.task.findUnique({
        where: { id: validId },
      });
      expect(updatedTask?.status).toBe("pending");
    });

    describe("Task RBAC Update Status", () => {
      beforeEach(async () => {
        const projectId = getProjectId(1, "active");

        await prisma.task.upsert({
          where: { id: 9999 },
          update: {},
          create: {
            id: 9999,
            deadline: new Date(),
            title: "User 2's Private Task",
            status: "active",
            assigneeId: "user-2",
            workspaceId: 1,
            projectId: projectId,
            categoryId: 1,
          },
        });
      });

      const statusUpdateTestCases = [
        { role: "admin", expected: "allow" },
        { role: "owner", expected: "allow" },
        { role: "manager", expected: "allow" },
        { role: "user", expected: "partial" },
        { role: "guest", expected: "deny" },
      ];

      it.each(statusUpdateTestCases)(
        "should $expected bulk status update for role: $role",
        async ({ role, expected }) => {
          await prisma.user.update({
            where: { id: "user-1" },
            data: { role },
          });

          (verifySession as any).mockResolvedValue({
            user: { id: "user-1", workspaceId: 1, role: role },
          });

          const ownTaskId = getTaskId(1, "active", 0);
          const otherTaskId = 9999;
          const taskIds = [ownTaskId, otherTaskId];
          const nextStatus = "completed" as const;

          if (expected === "allow") {
            const result = await updateTasks(taskIds, nextStatus);
            expect(result.count).toBe(2);
          } else if (expected === "partial") {
            const result = await updateTasks(taskIds, nextStatus);
            expect(result.count).toBe(1);

            const updatedOwn = await prisma.task.findUnique({
              where: { id: ownTaskId },
            });
            expect(updatedOwn?.status).toBe(nextStatus);
          } else {
            await expect(updateTasks(taskIds, nextStatus)).rejects.toThrow(
              AccessDeniedError,
            );
          }
        },
      );
    });
  });

  describe("deleteTasks", () => {
    it("should successfully delete multiple tasks in the current workspace and return the count", async () => {
      const id1 = getTaskId(1, "active", 0);
      const id2 = getTaskId(1, "active", 1);
      const idsToDelete = [id1, id2];

      const result = await deleteTasks(idsToDelete);

      expect(result.count).toBe(2);

      const remainingTasks = await prisma.task.findMany({
        where: { id: { in: idsToDelete } },
      });
      expect(remainingTasks).toHaveLength(0);
    });

    it("should return count 0 when attempting to delete tasks from a different workspace", async () => {
      const ws2Ids = [getTaskId(2, "active", 0)];

      const result = await deleteTasks(ws2Ids);

      expect(result.count).toBe(0);
    });

    it("should only delete tasks belonging to the current workspace in a mixed list", async () => {
      const validId = getTaskId(1, "pending", 0);
      const invalidId = getTaskId(2, "pending", 0);
      const mixedIds = [validId, invalidId];

      const result = await deleteTasks(mixedIds);

      expect(result.count).toBe(1);

      const task = await prisma.task.findUnique({
        where: { id: invalidId },
      });
      expect(task).not.toBeNull();
    });

    it("should return 0 if an empty array is provided", async () => {
      const result = await deleteTasks([]);
      expect(result.count).toBe(0);
    });

    describe("Task RBAC Deletion", () => {
      const taskId = getTaskId(1, "active", 0);

      const deleteTestCases = [
        { role: "admin", expected: "allow" },
        { role: "owner", expected: "allow" },
        { role: "manager", expected: "allow" },
        { role: "user", expected: "deny" },
        { role: "guest", expected: "deny" },
      ];

      it.each(deleteTestCases)(
        "should $expected deletion for role: $role",
        async ({ role, expected }) => {
          await prisma.user.update({
            where: { id: "user-1" },
            data: { role },
          });

          if (expected === "allow") {
            const result = await deleteTasks([taskId]);
            expect(result.count).toBe(1);
          } else {
            await expect(deleteTasks([taskId])).rejects.toThrow(
              AccessDeniedError,
            );
          }
        },
      );
    });
  });
});
