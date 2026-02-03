import {
  seedTasks,
  seedUsers,
  seedComments,
  seedProjects,
  seedCompanies,
  seedCustomers,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { getCommentList } from "../comment.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, beforeAll, it, expect } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getCommentList", () => {
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
    await seedComments();

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

  it("should return all comments for a task as a list of valid CommentListItemDTOs", async () => {
    const result = await getCommentList({ taskId: 1 });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      id: 3,
      content: "Comment 3",
      canEdit: true,
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
