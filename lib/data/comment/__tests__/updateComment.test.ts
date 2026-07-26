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
import { seed } from "@/prisma/test-seed";
import { updateComment } from "../comment.dal";
import { members } from "@/prisma/seed/test-data";
import { loginAs, setupAuth } from "@/lib/test-utils/auth";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { describe, beforeAll, it, expect, beforeEach, afterEach } from "vitest";

describe("updateComment", () => {
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

  it("should fail updating a comment from a different organization", async () => {
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
      beforeAll(async () => {
        await setupAuth("user-1");
      });

      it("allows updating own comment", async () => {
        const result = await updateComment({
          id: 1,
          content: "Comment",
        });
        expect(result.content).toBe("Comment");
      });

      it("allows updating another comment in same organization", async () => {
        const result = await updateComment({
          id: 2,
          content: "Comment",
        });
        expect(result.content).toBe("Comment");
      });
    });

    describe("User", () => {
      beforeAll(async () => {
        await setupAuth("user-2");
      });

      it("allows updating own comment", async () => {
        const result = await updateComment({
          id: 2,
          content: "Comment",
        });
        expect(result.content).toBe("Comment");
      });

      it("denies updating another user's comment", async () => {
        await expect(
          updateComment({ id: 1, content: "Comment" }),
        ).rejects.toThrow(PrismaClientKnownRequestError);
      });
    });

    describe("Anonymous", () => {
      beforeAll(async () => {
        await setupAuth();
      });

      it("denies updating any comment", async () => {
        await expect(
          updateComment({ id: 1, content: "Comment" }),
        ).rejects.toThrow(UnauthorizedError);
      });
    });
  });
});
