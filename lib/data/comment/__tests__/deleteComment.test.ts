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
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { afterEach } from "vitest";
import { deleteComment } from "../comment.dal";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { describe, beforeAll, it, expect, beforeEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("deleteComment", () => {
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

  afterEach(async () => {
    await prisma.comment.deleteMany();
    await prisma.attachment.deleteMany();
  });

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

  it("should successfully delete a comment", async () => {
    const deletedComment = await deleteComment(1);

    expect(deletedComment.id).toBe(1);
    expect(deletedComment.content).toBe("Comment 1");
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
