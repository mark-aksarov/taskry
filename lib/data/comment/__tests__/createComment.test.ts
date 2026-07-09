import {
  users,
  tasks,
  projects,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  ValidationError,
  AccessDeniedError,
} from "@/lib/data/utils/error";

import prisma from "@/lib/prisma";
import { createComment } from "../comment.dal";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { describe, beforeAll, it, expect, beforeEach } from "vitest";

describe("createComment", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      customers,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });
  });

  beforeEach(async () => {
    await prisma.comment.deleteMany();
  });

  it("should successfully create a comment for a task", async () => {
    const input = {
      id: 101,
      content: "Comment for Task 1",
      taskId: 1,
    };

    const result = await createComment(input);

    expect(result).toBeDefined();
    expect(result!.content).toBe("Comment for Task 1");
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
