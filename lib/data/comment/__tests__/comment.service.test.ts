import prisma from "@/lib/prisma";
import { getCommentList } from "../comment.service";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Comment Service", () => {
  beforeAll(async () => {
    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (verifySession as any).mockResolvedValue(mockSession);

    await resetDatabase();

    // Workspace
    await prisma.workspace.create({ data: { id: 1 } });

    // User
    await prisma.user.create({
      data: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "https://example.com/user-1.jpg",
        email: "user-1@test.com",
        workspaceId: 1,
      },
    });

    // Task Category
    await prisma.taskCategory.create({
      data: { id: 1, name: "Category 1", workspaceId: 1 },
    });

    // Project Category
    await prisma.projectCategory.create({
      data: { id: 1, name: "Category 1", workspaceId: 1 },
    });

    // Project
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          title: "Project 1",
          deadline: new Date("2025-02-10"),
          creatorId: "user-1",
          categoryId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          workspaceId: 1,
          title: "Project 2",
          deadline: new Date("2025-02-11"),
          creatorId: "user-1",
          categoryId: 1,
          status: ProjectStatus.active,
        },
      ],
    });

    // Task
    await prisma.task.create({
      data: {
        id: 1,
        title: "Task 1",
        deadline: new Date("2025-12-31"),
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-1",
        workspaceId: 1,
      },
    });

    // Comments
    await prisma.comment.createMany({
      data: [
        {
          id: 1,
          content: "Comment 1",
          projectId: 1,
          taskId: null,
          workspaceId: 1,
          senderId: "user-1",
          createdAt: new Date("2025-03-01"),
        },
        {
          id: 2,
          content: "Comment 2",
          projectId: 1,
          taskId: null,
          workspaceId: 1,
          senderId: "user-1",
          createdAt: new Date("2025-03-02"),
        },
        {
          id: 3,
          content: "Comment 3",
          projectId: null,
          taskId: 1,
          workspaceId: 1,
          senderId: "user-1",
          createdAt: new Date("2025-03-03"),
        },
      ],
    });

    // Attachments
    await prisma.attachment.createMany({
      data: [
        {
          id: 1,
          fileUrl: "http://example.com/file1.png",
          fileName: "file1.png",
          commentId: 3,
          workspaceId: 1,
        },
      ],
    });
  });

  describe("getCommentList", () => {
    it("should return all comments for a task as a list of valid CommentListItemDTOs", async () => {
      const result = await getCommentList({ taskId: 1 });

      expect(result).toHaveLength(1);
      expect(result[0]).toStrictEqual({
        id: 3,
        content: "Comment 3",
        createdAt: new Date("2025-03-03"),

        sender: {
          id: "user-1",
          fullName: "User 1",
          imageUrl: "https://example.com/user-1.jpg",
        },

        attachments: [{ id: 1, fileUrl: "http://example.com/file1.png" }],
      });
    });

    it("should return all comments for a project", async () => {
      const result = await getCommentList({ projectId: 1 });

      expect(result).toHaveLength(2);
      expect(result[0].content).toContain("Comment 1");
      expect(result[1].content).toContain("Comment 2");
    });

    it("should return empty array", async () => {
      const result = await getCommentList({ projectId: 2 });
      expect(result).toHaveLength(0);
    });
  });
});
