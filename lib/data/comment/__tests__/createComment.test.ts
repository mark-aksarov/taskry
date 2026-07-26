import { members } from "@/prisma/seed/test-data";
import {
  users,
  tasks,
  projects,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  AccessDeniedError,
} from "@/lib/data/utils/error";

import prisma from "@/lib/prisma";
import { createComment } from "../comment.dal";
import { seed } from "@/prisma/test-seed";
import { loginAs, setupAuth } from "@/lib/test-utils/auth";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { describe, beforeAll, it, expect, beforeEach } from "vitest";

describe("createComment", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });

    await loginAs("user-1");
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

  it("should fail with AccessDeniedError if the task belongs to a different organization", async () => {
    const input = {
      content: "Comment 1",
      taskId: 3,
    };

    const createCommentPromise = createComment(input);

    await expect(createCommentPromise).rejects.toThrow(AccessDeniedError);
    await expect(createCommentPromise).rejects.toThrow(/Task access denied/i);
  });

  it("should fail with AccessDeniedError if the project belongs to a different organization", async () => {
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      const createInput = {
        content: "Comment",
        taskId: 1,
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1");
      const result = await createComment(createInput);

      expect(result).toBeDefined();
      expect(result.content).toBe(createInput.content);
      expect(result.senderId).toBe("user-1");
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");
      const result = await createComment(createInput);

      expect(result).toBeDefined();
      expect(result.content).toBe(createInput.content);
      expect(result.senderId).toBe("user-2");
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();
      await expect(createComment(createInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
