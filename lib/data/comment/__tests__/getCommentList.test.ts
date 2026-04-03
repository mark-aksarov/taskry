import {
  users,
  tasks,
  projects,
  comments,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import { getCommentList } from "../comment.dal";
import { describe, beforeAll, it, expect } from "vitest";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";

describe("getCommentList", () => {
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
      comments,
    });
  });

  it("should return all comments for a task as a list of valid CommentListItemDTOs", async () => {
    const result = await getCommentList({ taskId: 1 });

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual({
      id: 3,
      content: "Comment 3",
      canEdit: true,
      createdAt: new Date("2025-03-03").toISOString(),

      sender: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "/man.jpg",
      },
    });
  });

  it("should return all comments for a project", async () => {
    const result = await getCommentList({ projectId: 1 });

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ content: "Comment 1" }),
        expect.objectContaining({ content: "Comment 2" }),
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await getCommentList({ projectId: 2 });
    expect(result).toHaveLength(0);
  });
});
