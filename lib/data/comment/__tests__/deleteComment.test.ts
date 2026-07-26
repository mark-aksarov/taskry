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

import prisma from "@/lib/prisma";
import { afterEach } from "vitest";
import { seed } from "@/prisma/test-seed";
import { deleteComment } from "../comment.dal";
import { members } from "@/prisma/seed/test-data";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { loginAs, setupAuth } from "@/lib/test-utils/auth";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { describe, beforeAll, it, expect, beforeEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("deleteComment", () => {
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

  afterEach(async () => {
    await prisma.comment.deleteMany();
  });

  beforeEach(async () => {
    await prisma.comment.createMany({
      data: [
        {
          id: 1,
          content: "Comment 1",
          taskId: 1,
          senderId: "user-1",
          organizationId: "org-1",
        },
        {
          id: 2,
          content: "Comment 2",
          projectId: 1,
          senderId: "user-2",
          organizationId: "org-1",
        },
        {
          id: 3,
          content: "Comment 3",
          taskId: 2,
          senderId: "user-4",
          organizationId: "org-2",
        },
        {
          id: 4,
          content: "Comment 4",
          projectId: 2,
          senderId: "user-4",
          organizationId: "org-2",
        },
      ],
    });
  });

  it("should successfully delete a comment", async () => {
    const deletedComment = await deleteComment(1);

    expect(deletedComment.id).toBe(1);
    expect(deletedComment.content).toBe("Comment 1");
  });

  it("should fail when deleting a comment from a different organization", async () => {
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
      beforeAll(async () => {
        await setupAuth("user-1");
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
      beforeAll(async () => {
        await setupAuth("user-2");
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

    describe("Anonymous", () => {
      beforeAll(async () => {
        await setupAuth();
      });

      it("denies deleting any comment", async () => {
        await expect(deleteComment(1)).rejects.toThrow(UnauthorizedError);
      });
    });
  });
});
