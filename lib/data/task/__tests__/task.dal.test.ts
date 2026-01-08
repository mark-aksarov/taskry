import {
  createTask,
  updateTask,
  deleteTasks,
  updateTasks,
  getTaskCount,
} from "../task.dal";

import prisma from "@/lib/prisma";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";
import {
  NotificationType,
  ProjectStatus,
  TaskStatus,
} from "@/generated/prisma/enums";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Task DAL", () => {
  beforeEach(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }, { id: 2 }] });

    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 2 },
      ],
    });

    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 2 },
      ],
    });

    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 2 },
      ],
    });

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
        {
          id: "user-5",
          fullName: "User 5",
          email: "user-5@test.com",
          role: "manager",
          workspaceId: 2,
        },
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
          companyId: 1,
          workspaceId: 2,
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
          title: "Project 2",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 2,
          status: ProjectStatus.active,
        },
      ],
    });
  });

  describe("getTaskCount", () => {
    it("should return the total count of tasks for the current workspace", async () => {
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
          },
          {
            id: 2,
            title: "Task 2",
            deadline: new Date(),
            projectId: 1,
            categoryId: 1,
            workspaceId: 1,
            status: TaskStatus.active,
          },
          {
            id: 3,
            title: "Task 3",
            deadline: new Date(),
            projectId: 2,
            categoryId: 2,
            workspaceId: 2,
            status: TaskStatus.active,
          },
        ],
      });

      const count = await getTaskCount();
      expect(count).toBe(2);
    });
  });

  describe("createTask", () => {
    it("should successfully create a task and send notifications in the current workspace", async () => {
      const projectId = 1;

      const input = {
        id: 100,
        title: "New Task",
        status: TaskStatus.active,
        projectId: projectId,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date(),
      };

      const result = await createTask(input);

      const notifications = await prisma.notification.findMany({
        where: { taskId: result.id },
      });

      expect(result).toBeDefined();
      expect(result.title).toBe(input.title);
      expect(result.workspaceId).toBe(1);
      expect(result.creatorId).toBe("user-1");
      expect(result.projectId).toBe(projectId);

      expect(notifications.length).toBe(1);
      expect(notifications[0].actorId).toBe("user-1");
      expect(notifications[0].taskId).toBe(result.id);
      expect(notifications[0].taskTitle).toBe("New Task");
      expect(notifications[0].taskStatus).toBe(TaskStatus.active);
      expect(notifications[0].projectId).toBe(null);
      expect(notifications[0].commentId).toBe(null);
      expect(notifications[0].type).toBe(NotificationType.taskAdded);
      expect(notifications[0].workspaceId).toBe(1);
      expect(notifications[0].recipientId).toBe("user-2");
    });

    it("should not send notifications to the creator when the assignee is the creator", async () => {
      const projectId = 1;
      const input = {
        id: 100,
        title: "New Task",
        status: TaskStatus.active,
        projectId: projectId,
        categoryId: 1,
        assigneeId: "user-1",
        deadline: new Date(),
      };

      const result = await createTask(input);

      const notifications = await prisma.notification.findMany({
        where: { taskId: result.id },
      });

      expect(result).toBeDefined();
      expect(result.title).toBe(input.title);
      expect(result.workspaceId).toBe(1);
      expect(result.creatorId).toBe("user-1");
      expect(result.projectId).toBe(projectId);

      expect(notifications.length).toBe(1);
      expect(notifications[0].recipientId).toBe("user-2");
    });

    it("should fail if the project belongs to a different workspace", async () => {
      const input = {
        id: 100,
        title: "New Task",
        status: TaskStatus.active,
        projectId: 2,
        categoryId: 1,
        assigneeId: "user-1",
        deadline: new Date(),
      };

      await expect(createTask(input as any)).rejects.toThrow();
    });

    it("should fail if the assignee belongs to a different workspace", async () => {
      const input = {
        id: 100,
        title: "New Task",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-5",
        deadline: new Date(),
      };

      await expect(createTask(input as any)).rejects.toThrow();
    });

    it("should fail if the task category belongs to a different workspace", async () => {
      const input = {
        id: 100,
        title: "New Task",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 2,
        assigneeId: "user-1",
        deadline: new Date(),
      };

      await expect(createTask(input as any)).rejects.toThrow();
    });

    it("should create a task without optional fields", async () => {
      const input = {
        id: 100,
        title: "New Task",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        deadline: new Date(),
      };

      const result = await createTask(input as any);

      expect(result.id).toBeDefined();
      expect(result.assigneeId).toBeNull();
    });

    describe("Task RBAC Creation", () => {
      const testCases = [
        { role: "owner", userId: "user-1", shouldSucceed: true },
        { role: "manager", userId: "user-2", shouldSucceed: true },
        { role: "user", userId: "user-3", shouldSucceed: false },
        { role: "guest", userId: "user-4", shouldSucceed: false },
      ];

      testCases.forEach(({ role, userId, shouldSucceed }) => {
        it(`should ${shouldSucceed ? "succeed" : "fail"} in creating a task for role: ${role}`, async () => {
          (verifySession as any).mockResolvedValue({
            user: { id: userId, workspaceId: 1 },
          });

          const taskInput = {
            id: 100,
            title: "New Task",
            status: TaskStatus.active,
            projectId: 1,
            categoryId: 1,
            assigneeId: "user-3",
            deadline: new Date(),
          };

          if (shouldSucceed) {
            const result = await createTask(taskInput);
            expect(result).toBeDefined();
            expect(result.title).toBe(taskInput.title);
          } else {
            await expect(createTask(taskInput)).rejects.toThrow(
              AccessDeniedError,
            );
          }
        });
      });
    });
  });

  describe("updateTask", () => {
    it("should successfully update task within the same workspace", async () => {
      const taskId = 100;

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
        },
      });

      const updateInput = {
        id: taskId,
        title: "Updated Task Title",
      };

      const result = await updateTask(updateInput);

      expect(result).not.toBeNull();
      expect(result!.id).toBe(taskId);
      expect(result!.title).toBe("Updated Task Title");
    });

    it("should return null when trying to update a task from another workspace", async () => {
      const taskId = 100;

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          workspaceId: 2,
          status: TaskStatus.active,
        },
      });

      const updateInput = {
        id: taskId,
        title: "Updated Task Title",
      };

      const result = await updateTask(updateInput);

      expect(result).toBeNull();
    });

    describe("Task Status Transition Rules", () => {
      const users: { [key: string]: { role: string; userId: string } } = {
        owner: { role: "owner", userId: "user-1" },
        manager: { role: "manager", userId: "user-2" },
        user: { role: "user", userId: "user-3" },
        guest: { role: "guest", userId: "user-4" },
      };

      const transitionRules: {
        user: { role: string; userId: string };
        pStatus: ProjectStatus;
        tStatus: TaskStatus;
        deny: TaskStatus[];
        skip: TaskStatus[];
        allow: TaskStatus[];
      }[] = [
        // Guest rules
        {
          user: users.guest,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.active,
          deny: ["active", "pending", "completed"],
          skip: [],
          allow: [],
        },
        {
          user: users.guest,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.pending,
          deny: ["active", "pending", "completed"],
          skip: [],
          allow: [],
        },
        {
          user: users.guest,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.completed,
          deny: ["active", "pending", "completed"],
          skip: [],
          allow: [],
        },
        {
          user: users.guest,
          pStatus: ProjectStatus.pending,
          tStatus: TaskStatus.pending,
          deny: ["active", "pending", "completed"],
          skip: [],
          allow: [],
        },
        {
          user: users.guest,
          pStatus: ProjectStatus.pending,
          tStatus: TaskStatus.completed,
          deny: ["active", "pending", "completed"],
          skip: [],
          allow: [],
        },
        {
          user: users.guest,
          pStatus: ProjectStatus.completed,
          tStatus: TaskStatus.completed,
          deny: ["active", "pending", "completed"],
          skip: [],
          allow: [],
        },
      ];

      // Owner, Manager, User rules
      [users.owner].forEach((user) => {
        transitionRules.push(
          {
            user,
            pStatus: ProjectStatus.active,
            tStatus: TaskStatus.active,
            deny: [],
            skip: [],
            allow: ["pending", "completed"],
          },
          {
            user,
            pStatus: ProjectStatus.active,
            tStatus: TaskStatus.pending,
            deny: [],
            skip: [],
            allow: ["active", "completed"],
          },
          {
            user,
            pStatus: ProjectStatus.active,
            tStatus: TaskStatus.completed,
            deny: [],
            skip: [],
            allow: ["active", "pending"],
          },
          {
            user,
            pStatus: ProjectStatus.pending,
            tStatus: TaskStatus.pending,
            deny: [],
            skip: ["active"],
            allow: ["completed"],
          },
          {
            user,
            pStatus: ProjectStatus.pending,
            tStatus: TaskStatus.completed,
            deny: [],
            skip: ["active"],
            allow: ["pending"],
          },
          {
            user,
            pStatus: ProjectStatus.completed,
            tStatus: TaskStatus.completed,
            deny: [],
            skip: ["active", "pending"],
            allow: [],
          },
        );
      });

      transitionRules.forEach((rule) => {
        describe(`Role: ${rule.user.role} | Project: ${rule.pStatus} | Task: ${rule.tStatus}`, () => {
          const projectId = 100;
          const taskId = 100;

          beforeEach(async () => {
            (verifySession as any).mockResolvedValue({
              user: { id: rule.user.userId, workspaceId: 1 },
            });

            await prisma.project.create({
              data: {
                id: projectId,
                title: "Project",
                deadline: new Date(),
                categoryId: 1,
                workspaceId: 1,
                status: rule.pStatus,
              },
            });

            await prisma.task.create({
              data: {
                id: taskId,
                title: "Task",
                deadline: new Date(),
                projectId,
                categoryId: 1,
                workspaceId: 1,
                assigneeId: rule.user.userId,
                status: rule.tStatus,
              },
            });
          });

          rule.allow.forEach((status) => {
            it(`should allow transition to ${status}`, async () => {
              const updateInput = { id: taskId, status };
              const result = await updateTask(updateInput);

              expect(result).not.toBeNull();
              expect(result!.id).toBe(taskId);
              expect(result!.status).toBe(status);
            });
          });

          rule.deny.forEach((status) => {
            it(`should throw AccessDeniedError when transition to ${status}`, async () => {
              const updateInput = { id: taskId, status };
              await expect(updateTask(updateInput)).rejects.toThrow(
                AccessDeniedError,
              );
            });
          });

          rule.skip.forEach((status) => {
            it(`should skip transition to ${status}`, async () => {
              const updateInput = { id: taskId, status };
              const result = await updateTask(updateInput);

              expect(result).not.toBeNull();
              expect(result!.id).toBe(taskId);
              expect(result!.status).toBe(rule.tStatus);
            });
          });
        });
      });
    });

    it("should fail if updated relations (like project) belong to another workspace", async () => {
      const taskId = 1;
      const projectId = 2;

      const updateInput = {
        id: taskId,
        projectId,
      };

      await expect(updateTask(updateInput)).rejects.toThrow();
    });

    /*describe("Task RBAC Updating", () => {
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

          const taskId = 1;
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
    });*/
  });

  /*
  describe("updateTasks", () => {
    it("should update multiple tasks when they are in the current workspace and have allowed project statuses", async () => {
      const taskIds = [1, 2];
      const nextStatus = "completed" as const;

      const result = await updateTasks(taskIds, nextStatus);

      expect(result.count).toBe(2);

      const updatedTasks = await prisma.task.findMany({
        where: { id: { in: taskIds } },
      });
      updatedTasks.forEach((t) => expect(t.status).toBe(nextStatus));
    });

    it("should return count 0 when attempting to update tasks from a different workspace", async () => {
      const taskIds = [1, 2];

      const result = await updateTasks(taskIds, "completed");

      expect(result.count).toBe(0);
    });

    it("should not update tasks if their parent project status is not allowed", async () => {
      const taskId = 1;
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
      const validId = 1;
      const invalidId = 2;

      const result = await updateTasks([validId, invalidId], "pending");

      expect(result.count).toBe(1);

      const updatedTask = await prisma.task.findUnique({
        where: { id: validId },
      });
      expect(updatedTask?.status).toBe("pending");
    });

    describe("Task RBAC Update Status", () => {
      beforeEach(async () => {
        const projectId = 1;

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

          const ownTaskId = 1;
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
      const id1 = 1;
      const id2 = 2;
      const idsToDelete = [id1, id2];

      const result = await deleteTasks(idsToDelete);

      expect(result.count).toBe(2);

      const remainingTasks = await prisma.task.findMany({
        where: { id: { in: idsToDelete } },
      });
      expect(remainingTasks).toHaveLength(0);
    });

    it("should return count 0 when attempting to delete tasks from a different workspace", async () => {
      const ws2Ids = [1];

      const result = await deleteTasks(ws2Ids);

      expect(result.count).toBe(0);
    });

    it("should only delete tasks belonging to the current workspace in a mixed list", async () => {
      const validId = 1;
      const invalidId = 2;
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
      const taskId = 1;

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
  */
});
