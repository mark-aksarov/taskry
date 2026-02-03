import {
  seedTasks,
  seedUsers,
  seedProjects,
  seedCompanies,
  seedCustomers,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import {
  NotFoundError,
  ValidationError,
  AccessDeniedError,
} from "@/lib/data/utils/error";

import prisma from "@/lib/prisma";
import { createComment } from "../comment.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { describe, beforeAll, it, expect, beforeEach } from "vitest";

describe("createComment", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedCompanies();
    await seedCustomers();
    await seedProjectCategories();
    await seedProjects();
    await seedTaskCategories();
    await seedTasks();
  });

  beforeEach(async () => {
    await prisma.comment.deleteMany();
    await prisma.attachment.deleteMany();
  });

  it("should successfully create a comment for a task", async () => {
    const input = {
      id: 101,
      content: "Comment for Task 1",
      taskId: 1,
      attachments: [
        { fileUrl: "http://example.com/task.png", fileName: "task.png" },
      ],
    };

    const result = await createComment(input);
    const attachments = await prisma.attachment.findMany();

    expect(result).toBeDefined();
    expect(result!.content).toBe("Comment for Task 1");
    expect(attachments[0]).toMatchObject({
      fileName: "task.png",
      workspaceId: 1,
    });
  });

  it("should successfully create a comment for a project", async () => {
    const input = {
      id: 202,
      content: "Comment for Project 1",
      projectId: 1,
    };

    const result = await createComment(input);

    expect(result).toBeDefined();
    expect(result!.content).toBe("Comment for Project 1");
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

    const createCommentPromise = createComment(input);

    await expect(createCommentPromise).rejects.toThrow(ValidationError);
    await expect(createCommentPromise).rejects.toThrow(
      /exactly one task or project/i,
    );
  });

  it("should fail with NotFoundError if the task is not found", async () => {
    const input = {
      content: "Comment 1",
      taskId: 999,
    };

    const createCommentPromise = createComment(input);

    await expect(createCommentPromise).rejects.toThrow(NotFoundError);
    await expect(createCommentPromise).rejects.toThrow(/Task not found/i);
  });

  it("should fail with NotFoundError if the project is not found", async () => {
    const input = {
      content: "Comment 1",
      projectId: 999,
    };

    const createCommentPromise = createComment(input);

    await expect(createCommentPromise).rejects.toThrow(NotFoundError);
    await expect(createCommentPromise).rejects.toThrow(/Project not found/i);
  });

  it("should fail with AccessDeniedError if the task belongs to a different workspace", async () => {
    const input = {
      content: "Comment 1",
      taskId: 3,
    };

    const createCommentPromise = createComment(input);

    await expect(createCommentPromise).rejects.toThrow(AccessDeniedError);
    await expect(createCommentPromise).rejects.toThrow(/Task access denied/i);
  });

  it("should fail with AccessDeniedError if the project belongs to a different workspace", async () => {
    const input = {
      content: "Comment 1",
      projectId: 3,
    };

    const createCommentPromise = createComment(input);

    await expect(createCommentPromise).rejects.toThrow(AccessDeniedError);
    await expect(createCommentPromise).rejects.toThrow(
      /Project access denied/i,
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
