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

import prisma from "@/lib/prisma";
import { updateComment } from "../comment.dal";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { describe, beforeAll, it, expect, beforeEach, afterEach } from "vitest";

describe("updateComment", () => {
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
  });

  it("should successfully update a comment", async () => {
    const updatedComment = await updateComment({
      id: 1,
      content: "Updated Comment 1",
    });

    expect(updatedComment).toBeDefined();
    expect(updatedComment.content).toBe("Updated Comment 1");
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
