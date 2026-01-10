import {
  createTask,
  updateTask,
  deleteTasks,
  updateTaskStatuses,
  getTaskCount,
} from "../task.dal";

import prisma from "@/lib/prisma";
import { AccessDeniedError, DomainRuleError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
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

const transitionRules: {
  pStatus: ProjectStatus;
  tStatus: TaskStatus;
  deny: TaskStatus[];
  allow: TaskStatus[];
}[] = [
  {
    pStatus: ProjectStatus.active,
    tStatus: TaskStatus.active,
    deny: [],
    allow: ["pending", "completed"],
  },
  {
    pStatus: ProjectStatus.active,
    tStatus: TaskStatus.pending,
    deny: [],
    allow: ["active", "completed"],
  },
  {
    pStatus: ProjectStatus.active,
    tStatus: TaskStatus.completed,
    deny: [],
    allow: ["active", "pending"],
  },
  {
    pStatus: ProjectStatus.pending,
    tStatus: TaskStatus.pending,
    deny: ["active"],
    allow: ["completed"],
  },
  {
    pStatus: ProjectStatus.pending,
    tStatus: TaskStatus.completed,
    deny: ["active"],
    allow: ["pending"],
  },
  {
    pStatus: ProjectStatus.completed,
    tStatus: TaskStatus.completed,
    deny: ["active", "pending"],
    allow: [],
  },
];

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

    it("should throw an error when trying to update a task from another workspace", async () => {
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

      await expect(updateTask(updateInput)).rejects.toThrow("Task not found");
    });

    describe("RBAC: update task", () => {
      const setup = async (userId: string, role: string) => {
        (verifySession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

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

        return {
          taskId,
          updateInput: {
            id: taskId,
            title: "Updated Task Title",
          },
        };
      };

      it("should succeed for owner", async () => {
        const { updateInput } = await setup("user-1", "owner");
        const result = await updateTask(updateInput);
        expect(result.title).toBe(updateInput.title);
      });

      it("should succeed for manager", async () => {
        const { updateInput } = await setup("user-2", "manager");
        const result = await updateTask(updateInput);
        expect(result.title).toBe(updateInput.title);
      });

      it("should fail for user", async () => {
        const { updateInput } = await setup("user-3", "user");

        await expect(updateTask(updateInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });

      it("should fail for guest", async () => {
        const { updateInput } = await setup("user-4", "guest");

        await expect(updateTask(updateInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });

    describe("update task status by project status", () => {
      transitionRules.forEach((rule) => {
        describe(`Project: ${rule.pStatus} | Task: ${rule.tStatus}`, () => {
          const projectId = 100;
          const taskId = 100;

          beforeEach(async () => {
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
                assigneeId: "user-1",
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
            it(`should throw DomainRuleError when transition to ${status}`, async () => {
              const updateInput = { id: taskId, status };
              await expect(updateTask(updateInput)).rejects.toThrow(
                DomainRuleError,
              );
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
  });

  describe("updateTaskStatuses", () => {
    it("should update multiple task statuses and send notifications when they are in the current workspace", async () => {
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
            assigneeId: "user-3",
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

      const taskIds = [1, 2];
      const nextStatus = TaskStatus.completed;

      const result = await updateTaskStatuses(taskIds, nextStatus);
      const updatedTasks = await prisma.task.findMany({
        where: { id: { in: taskIds } },
      });
      const notifications = await prisma.notification.findMany({
        where: { taskId: { in: taskIds } },
      });

      expect(result.count).toBe(2);
      updatedTasks.forEach((t) => expect(t.status).toBe(nextStatus));
      expect(notifications).toHaveLength(3);

      // user-1 do not receive notifications because he is the actor of the notification
      // user-2 receive notification for task 1 and task 2 because he has manager role
      const notification1 = notifications.find(
        (n) => n.taskTitle === "Task 1" && n.recipientId === "user-2",
      );
      const notification2 = notifications.find(
        (n) => n.taskTitle === "Task 2" && n.recipientId === "user-2",
      );
      expect(notification1).toBeDefined();
      expect(notification2).toBeDefined();

      // user-3 do not receive notifications because he is not the assignee of the task and has user role
      const notification3 = notifications.find(
        (n) => n.taskTitle === "Task 2" && n.recipientId === "user-3",
      );
      expect(notification3).toBeUndefined();
    });

    it("should return count 0 when attempting to update tasks from a different workspace", async () => {
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
            projectId: 2,
            categoryId: 2,
            workspaceId: 2,
            status: TaskStatus.active,
          },
        ],
      });

      const taskIds = [2];

      const result = await updateTaskStatuses(taskIds, "completed");
      const notifications = await prisma.notification.findMany();

      expect(result.count).toBe(0);
      expect(notifications).toHaveLength(0);
    });

    describe("RBAC: update task status", () => {
      const setup = async (
        userId: string,
        role: string,
        assigneeId?: string,
      ) => {
        (verifySession as any).mockResolvedValue({
          user: { id: userId, role, workspaceId: 1 },
        });

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
            assigneeId,
          },
        });
      };

      it("should succeed for owner", async () => {
        await setup("user-1", "owner");

        const result = await updateTaskStatuses([100], "completed");

        expect(result.count).toBe(1);
        const updatedTask = await prisma.task.findFirst({
          where: { id: 100 },
        });
        expect(updatedTask!.status).toBe("completed");
      });

      it("should succeed for manager", async () => {
        await setup("user-2", "manager");

        const result = await updateTaskStatuses([100], "completed");

        expect(result.count).toBe(1);
        const updatedTask = await prisma.task.findFirst({
          where: { id: 100 },
        });
        expect(updatedTask!.status).toBe("completed");
      });

      it("should succeed for assignee user", async () => {
        await setup("user-3", "user", "user-3");

        const result = await updateTaskStatuses([100], "completed");

        expect(result.count).toBe(1);
        const updatedTask = await prisma.task.findFirst({
          where: { id: 100 },
        });
        expect(updatedTask!.status).toBe("completed");
      });

      it("should fail for not assignee user", async () => {
        await setup("user-3", "user");

        const result = await updateTaskStatuses([100], "completed");

        expect(result.count).toBe(0);
        const updatedTask = await prisma.task.findFirst({
          where: { id: 100 },
        });
        expect(updatedTask!.status).toBe("active");
      });

      it("should fail for guest", async () => {
        await setup("user-4", "guest");

        await expect(updateTaskStatuses([100], "completed")).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });

    describe("update task status by project status", () => {
      transitionRules.forEach((rule) => {
        describe(`Project: ${rule.pStatus} | Task: ${rule.tStatus}`, () => {
          const projectId = 100;
          const taskId = 100;

          beforeEach(async () => {
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
                assigneeId: "user-1",
                status: rule.tStatus,
              },
            });
          });

          rule.allow.forEach((status) => {
            it(`should allow transition to ${status}`, async () => {
              const result = await updateTaskStatuses([taskId], status);

              expect(result.count).toBe(1);
              const updatedTask = await prisma.task.findFirst({
                where: { id: 100 },
              });
              expect(updatedTask!.status).toBe(status);
            });
          });

          rule.deny.forEach((status) => {
            it(`should throw DomainRuleError when transition to ${status}`, async () => {
              const result = await updateTaskStatuses([taskId], status);

              expect(result.count).toBe(0);
              const updatedTask = await prisma.task.findFirst({
                where: { id: 100 },
              });
              expect(updatedTask!.status).toBe(rule.tStatus);
            });
          });
        });
      });
    });
  });

  describe("deleteTasks", () => {
    it("should successfully delete tasks and send notifications in the current workspace", async () => {
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
            assigneeId: "user-3",
          },
        ],
      });

      const result = await deleteTasks([1, 2]);

      expect(result.count).toBe(2);
      const remainingTasks = await prisma.task.findMany();
      const notifications = await prisma.notification.findMany();

      expect(remainingTasks).toHaveLength(0);
      expect(notifications).toHaveLength(3);

      // user-1 do not receive notifications because he is the actor of the notification

      // user-2 receive notifications (task 1 and task 2) because he is manager
      const notification1 = notifications.find(
        (n) => n.taskTitle === "Task 1" && n.recipientId === "user-2",
      );
      const notification2 = notifications.find(
        (n) => n.taskTitle === "Task 2" && n.recipientId === "user-2",
      );
      expect(notification1).toBeDefined();
      expect(notification2).toBeDefined();

      // user-3 receive notification only for task 2 because he is the assignee
      const notification3 = notifications.find(
        (n) => n.taskTitle === "Task 2" && n.recipientId === "user-3",
      );
      expect(notification3).toBeDefined();
    });

    it("should not delete tasks from a different workspace", async () => {
      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task 1",
            deadline: new Date(),
            projectId: 2,
            categoryId: 2,
            workspaceId: 2,
            status: TaskStatus.active,
          },
        ],
      });

      const result = await deleteTasks([1]);
      const notifications = await prisma.notification.findMany();

      expect(result.count).toBe(0);
      expect(notifications).toHaveLength(0);
    });

    it("should only delete tasks belonging to the current workspace", async () => {
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
            projectId: 2,
            categoryId: 2,
            workspaceId: 2,
            status: TaskStatus.active,
          },
        ],
      });

      const validId = 1;
      const invalidId = 2;
      const mixedIds = [validId, invalidId];

      const result = await deleteTasks(mixedIds);

      expect(result.count).toBe(1);

      const task = await prisma.task.findUnique({
        where: { id: invalidId },
      });
      const notifications = await prisma.notification.findMany();

      expect(task).not.toBeNull();

      expect(notifications).toHaveLength(1);
      expect(notifications[0].recipientId).toBe("user-2");
    });

    it("should return 0 if an empty array is provided", async () => {
      const result = await deleteTasks([]);
      expect(result.count).toBe(0);
    });

    describe("Task RBAC Deletion", () => {
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
            },
          ],
        });
      });

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
            const result = await deleteTasks([1]);
            expect(result.count).toBe(1);
          } else {
            await expect(deleteTasks([1])).rejects.toThrow(AccessDeniedError);
          }
        },
      );
    });
  });
});
