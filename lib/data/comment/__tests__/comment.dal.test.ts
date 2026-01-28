import {
  TaskStatus,
  ProjectStatus,
  NotificationType,
} from "@/generated/prisma/enums";

import {
  vi,
  it,
  expect,
  describe,
  beforeAll,
  afterEach,
  beforeEach,
} from "vitest";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { createComment, deleteComment, updateComment } from "../comment.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { PrismaClientKnownRequestError } from "@/generated/prisma/internal/prismaNamespace";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Comment DAL", () => {
  beforeEach(() => {
    (requireSession as any).mockResolvedValue({
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
      await prisma.attachment.deleteMany();
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

    describe("RBAC: create comment", () => {
      describe("Owner", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-1", role: "owner", workspaceId: 1 },
          });
        });

        it("allows creating a comment", async () => {
          const input = {
            content: "Comment by owner",
            taskId: 1,
          };

          const result = await createComment(input);

          expect(result).toBeDefined();
          expect(result.content).toBe(input.content);
          expect(result.senderId).toBe("user-1");
        });
      });

      describe("User", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-2", role: "user", workspaceId: 1 },
          });
        });

        it("allows creating a comment", async () => {
          const input = {
            content: "Comment by user",
            taskId: 1,
          };

          const result = await createComment(input);

          expect(result).toBeDefined();
          expect(result.content).toBe(input.content);
          expect(result.senderId).toBe("user-2");
        });
      });

      describe("Guest", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-3", role: "guest", workspaceId: 1 },
          });
        });

        it("denies creating a comment", async () => {
          const input = {
            content: "Comment by guest",
            taskId: 1,
          };

          await expect(createComment(input)).rejects.toThrow(AccessDeniedError);
        });
      });
    });
  });

  describe("deleteComment", () => {
    beforeEach(async () => {
      await prisma.comment.createMany({
        data: [
          {
            id: 1,
            content: "Comment 1",
            taskId: 1,
            senderId: "user-1",
            workspaceId: 1,
          },
          {
            id: 2,
            content: "Comment 2",
            projectId: 1,
            senderId: "user-2",
            workspaceId: 1,
          },
          {
            id: 3,
            content: "Comment 3",
            taskId: 2,
            senderId: "user-4",
            workspaceId: 2,
          },
          {
            id: 4,
            content: "Comment 4",
            projectId: 2,
            senderId: "user-4",
            workspaceId: 2,
          },
        ],
      });
    });

    afterEach(async () => {
      await prisma.comment.deleteMany();
      await prisma.notification.deleteMany();
      await prisma.attachment.deleteMany();
    });

    it("should successfully delete a comment and send notifications", async () => {
      const deletedComment = await deleteComment(1);

      const notifications = await prisma.notification.findMany();

      expect(deletedComment.id).toBe(1);
      expect(deletedComment.content).toBe("Comment 1");

      expect(notifications).toHaveLength(2);

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: 1,
        taskTitle: "Task 1",
        projectId: null,
        projectTitle: null,
        type: NotificationType.commentDeleted,
      };

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

    it("should fail when deleting a comment from a different workspace", async () => {
      await expect(deleteComment(3)).rejects.toThrow(
        PrismaClientKnownRequestError,
      );
    });

    it("should fail deleting a comment that does not exist", async () => {
      await expect(deleteComment(999)).rejects.toThrow(
        PrismaClientKnownRequestError,
      );
    });

    describe("RBAC: delete comment", () => {
      describe("Owner", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-1", role: "owner", workspaceId: 1 },
          });
        });

        it("allows deleting own comment", async () => {
          const result = await deleteComment(1);
          expect(result.id).toBe(1);
        });

        it("allows deleting another comment", async () => {
          const result = await deleteComment(2);
          expect(result.id).toBe(2);
        });
      });

      describe("User", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-2", role: "user", workspaceId: 1 },
          });
        });

        it("allows deleting own comment", async () => {
          const result = await deleteComment(2);
          expect(result.id).toBe(2);
        });

        it("denies deleting another comment", async () => {
          await expect(deleteComment(1)).rejects.toThrow(
            PrismaClientKnownRequestError,
          );
        });
      });

      describe("Guest", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-3", role: "guest", workspaceId: 1 },
          });
        });

        it("denies deleting any comment", async () => {
          await expect(deleteComment(1)).rejects.toThrow(AccessDeniedError);
        });
      });
    });
  });

  describe("updateComment", () => {
    beforeEach(async () => {
      await prisma.comment.createMany({
        data: [
          {
            id: 1,
            content: "Comment 1",
            taskId: 1,
            senderId: "user-1",
            workspaceId: 1,
          },
          {
            id: 2,
            content: "Comment 2",
            projectId: 1,
            senderId: "user-2",
            workspaceId: 1,
          },
          {
            id: 3,
            content: "Comment 3",
            taskId: 2,
            senderId: "user-4",
            workspaceId: 2,
          },
        ],
      });
    });

    afterEach(async () => {
      await prisma.comment.deleteMany();
      await prisma.notification.deleteMany();
    });

    it("should successfully update a comment and send notifications", async () => {
      const updatedComment = await updateComment({
        id: 1,
        content: "Updated Comment 1",
      });

      expect(updatedComment).toBeDefined();
      expect(updatedComment.content).toBe("Updated Comment 1");

      const notifications = await prisma.notification.findMany();
      expect(notifications).toHaveLength(2);

      const expectedNotificationData = {
        actorId: "user-1",
        taskId: 1,
        taskTitle: "Task 1",
        projectId: null,
        projectTitle: null,
        type: NotificationType.commentChanged,
      };

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

    it("should fail updating a comment from a different workspace", async () => {
      await expect(
        updateComment({ id: 3, content: "Attempted update" }),
      ).rejects.toThrow(PrismaClientKnownRequestError);

      await expect(
        updateComment({ id: 3, content: "Attempted update" }),
      ).rejects.toMatchObject({ code: "P2025" });
    });

    it("should fail updating a comment that does not exist", async () => {
      await expect(
        updateComment({ id: 999, content: "Nonexistent comment" }),
      ).rejects.toThrow(PrismaClientKnownRequestError);

      await expect(
        updateComment({ id: 999, content: "Nonexistent comment" }),
      ).rejects.toMatchObject({ code: "P2025" });
    });

    describe("RBAC: update comment", () => {
      describe("Owner", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-1", role: "owner", workspaceId: 1 },
          });
        });

        it("allows updating own comment", async () => {
          const result = await updateComment({
            id: 1,
            content: "Owner updated",
          });
          expect(result.content).toBe("Owner updated");
        });

        it("allows updating another comment in same workspace", async () => {
          const result = await updateComment({
            id: 2,
            content: "Owner edits other",
          });
          expect(result.content).toBe("Owner edits other");
        });
      });

      describe("User", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-2", role: "user", workspaceId: 1 },
          });
        });

        it("allows updating own comment", async () => {
          const result = await updateComment({
            id: 2,
            content: "User updated own",
          });
          expect(result.content).toBe("User updated own");
        });

        it("denies updating another user's comment", async () => {
          await expect(
            updateComment({ id: 1, content: "User tries to update" }),
          ).rejects.toThrow(PrismaClientKnownRequestError);
        });
      });

      describe("Guest", () => {
        beforeEach(() => {
          (requireSession as any).mockResolvedValue({
            user: { id: "user-3", role: "guest", workspaceId: 1 },
          });
        });

        it("denies updating any comment", async () => {
          await expect(
            updateComment({ id: 1, content: "Guest tries to update" }),
          ).rejects.toThrow(AccessDeniedError);
        });
      });
    });
  });
});
