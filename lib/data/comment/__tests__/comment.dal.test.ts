import prisma from "@/lib/prisma";
import { getComments } from "../comment.dal";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("Comment DAL", () => {
  beforeEach(async () => {
    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

    await resetDatabase();

    // Workspace
    await prisma.workspace.create({ data: { id: 1 } });

    // User
    await prisma.user.create({
      data: {
        id: "user-1",
        fullName: "Alice Johnson",
        email: "alice@ws1.com",
        workspaceId: 1,
      },
    });

    // Task Category
    await prisma.taskCategory.create({
      data: { id: 1, name: "Development", workspaceId: 1 },
    });

    // Project Category
    await prisma.projectCategory.create({
      data: { id: 1, name: "Marketing", workspaceId: 1 },
    });

    // Project
    await prisma.project.create({
      data: {
        id: 1,
        workspaceId: 1,
        title: "Ad Campaign",
        description: "Launch Google Ads campaign",
        deadline: new Date("2025-02-10"),
        creatorId: "user-1",
        categoryId: 1,
        status: ProjectStatus.active,
      },
    });

    // Task
    await prisma.task.create({
      data: {
        id: 1,
        title: "Launch Google Ads campaign",
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
          content: "First project comment",
          projectId: 1,
          taskId: null,
          workspaceId: 1,
          senderId: "user-1",
          parentId: null,
        },
        {
          id: 2,
          content: "Second project comment",
          projectId: 1,
          taskId: null,
          workspaceId: 1,
          senderId: "user-1",
          parentId: null,
        },
        {
          id: 3,
          content: "Reply to first comment",
          projectId: 1,
          taskId: null,
          workspaceId: 1,
          senderId: "user-1",
          parentId: 1,
        },
        {
          id: 4,
          content: "Task specific comment",
          projectId: null,
          taskId: 1,
          workspaceId: 1,
          senderId: "user-1",
          parentId: null,
        },
      ],
    });
  });

  describe("getComments", () => {
    it("should return only top-level project comments (excluding task comments)", async () => {
      const result = await getComments({ projectId: 1 });
      expect(result).toHaveLength(2);

      const contents = result.map((c) => c.content);
      expect(contents).toContain("First project comment");
      expect(contents).toContain("Second project comment");
      expect(contents).not.toContain("Task specific comment");
    });

    it("should return only top-level task comments", async () => {
      const result = await getComments({ taskId: 1 });

      expect(result).toHaveLength(1);
      expect(result[0].content).toBe("Task specific comment");
    });

    it("should return empty array if searching for comments in wrong workspace", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 2 },
      });

      const result = await getComments({ projectId: 1 });

      expect(result).toHaveLength(0);
    });

    it("should exclude replies even if they belong to the same project", async () => {
      const result = await getComments({ projectId: 1 });

      const reply = result.find((c) => c.content === "Reply to first comment");
      expect(reply).toBeUndefined();
    });
  });
});
