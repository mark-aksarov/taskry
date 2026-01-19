import {
  TaskStatus,
  ProjectStatus,
  NotificationType,
} from "@/generated/prisma/enums";

import prisma from "@/lib/prisma";
import { createComment } from "../comment.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { verifySession } from "@/lib/data/utils/verifySession";
import { vi, describe, it, expect, beforeEach, beforeAll } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Comment DAL", () => {
  beforeEach(() => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });
  });

  beforeAll(async () => {
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
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "guest",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
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

    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          status: TaskStatus.active,
          projectId: 1,
          categoryId: 1,
          assigneeId: "user-2",
          deadline: new Date(),
          workspaceId: 1,
        },
        {
          id: 2,
          title: "Task 2",
          status: TaskStatus.active,
          projectId: 1,
          categoryId: 1,
          assigneeId: "user-4",
          deadline: new Date(),
          workspaceId: 2,
        },
      ],
    });
  });

  describe("createComment", () => {
    beforeEach(async () => {
      await prisma.comment.deleteMany();
      await prisma.notification.deleteMany();
    });

    it("should successfully create a comment for a task and send notifications with task metadata", async () => {
      const input = {
        id: 101,
        content: "Comment for Task 1",
        taskId: 1,
        attachments: [
          { fileUrl: "http://example.com/task.png", fileName: "task.png" },
        ],
      };

      const result = await createComment(input);

      const [notifications, attachments] = await Promise.all([
        prisma.notification.findMany(),
        prisma.attachment.findMany(),
      ]);

      expect(result).toBeDefined();
      expect(result!.content).toBe("Comment for Task 1");

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: 1,
        taskTitle: "Task 1",
        projectId: null,
        projectTitle: null,
        type: NotificationType.commentAdded,
      };

      expect(notifications).toHaveLength(2);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-3",
          }),
        ]),
      );

      expect(attachments[0]).toMatchObject({
        fileName: "task.png",
        workspaceId: 1,
      });
    });

    it("should successfully create a comment for a project and send notifications with project metadata", async () => {
      const input = {
        id: 202,
        content: "Comment for Project 1",
        projectId: 1,
      };

      const result = await createComment(input);

      const notifications = await prisma.notification.findMany({
        orderBy: { recipientId: "asc" },
      });

      expect(result).toBeDefined();
      expect(result!.content).toBe("Comment for Project 1");

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: null,
        taskTitle: null,
        projectId: 1,
        projectTitle: "Project 1",
        type: NotificationType.commentAdded,
      };

      expect(notifications).toHaveLength(2);

      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-2",
          }),
          expect.objectContaining({
            ...expectedNotificationData,
            recipientId: "user-3",
          }),
        ]),
      );
    });

    it("should successfully create a comment without attachments", async () => {
      const input = {
        id: 100,
        content: "Comment 1",
        taskId: 1,
      };
      const result = await createComment(input);
      const attachmentsCount = await prisma.attachment.count();

      expect(result).toBeDefined();
      expect(result.content).toBe("Comment 1");
      expect(attachmentsCount).toBe(0);
    });

    it("should throw Error when both taskId and projectId are provided", async () => {
      const input = {
        content: "Comment 1",
        taskId: 1,
        projectId: 1,
      };

      await expect(createComment(input as any)).rejects.toThrow(
        /exactly one task or project/i,
      );
    });

    it("should throw ValidationError when neither taskId nor projectId is provided", async () => {
      const input = {
        content: "Comment 1",
      };

      await expect(createComment(input as any)).rejects.toThrow(
        /exactly one task or project/i,
      );
    });

    it("should fail with AccessDeniedError if the task belongs to a different workspace", async () => {
      const input = {
        content: "Comment 1",
        taskId: 2,
      };

      await expect(createComment(input)).rejects.toThrow(AccessDeniedError);

      await expect(createComment(input)).rejects.toThrow(
        /Task access denied or not found/i,
      );
    });

    it("should fail with AccessDeniedError if the project belongs to a different workspace", async () => {
      const input = {
        content: "Comment 1",
        projectId: 2,
      };

      await expect(createComment(input)).rejects.toThrow(AccessDeniedError);

      await expect(createComment(input)).rejects.toThrow(
        /Project access denied or not found/i,
      );
    });

    describe("Comment RBAC Creation", () => {
      const testCases = [
        { role: "owner", userId: "user-1", shouldSucceed: true },
        { role: "user", userId: "user-2", shouldSucceed: true },
        { role: "guest", userId: "user-3", shouldSucceed: false },
      ];

      testCases.forEach(({ role, userId, shouldSucceed }) => {
        it(`should ${shouldSucceed ? "allow" : "deny"} comment creation for role: ${role}`, async () => {
          (verifySession as any).mockResolvedValue({
            user: { id: userId, workspaceId: 1 },
          });

          const commentInput = {
            content: `Comment by ${role}`,
            taskId: 1,
          };

          if (shouldSucceed) {
            const result = await createComment(commentInput);

            expect(result).toBeDefined();
            expect(result.content).toBe(commentInput.content);
            expect(result.senderId).toBe(userId);
          } else {
            await expect(createComment(commentInput)).rejects.toThrow(
              AccessDeniedError,
            );
          }
        });
      });
    });
  });
});
