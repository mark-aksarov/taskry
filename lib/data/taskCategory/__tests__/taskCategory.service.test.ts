import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { getTaskCategorySummaries } from "../taskCategory.service";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("TaskCategory service", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.workspace.create({ data: { id: 1 } });
    await prisma.workspace.create({ data: { id: 2 } });

    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Category 1", workspaceId: 1 },
        { id: 2, name: "Category 2", workspaceId: 1 },
        { id: 3, name: "Category 3", workspaceId: 2 },
        { id: 4, name: "Category 4", workspaceId: 2 },
      ],
    });
  });

  describe("getTaskCategorySummaries", () => {
    it("should return only task categories belonging to the current workspace", async () => {
      const result = await getTaskCategorySummaries();

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, name: "Category 1" }),
          expect.objectContaining({ id: 2, name: "Category 2" }),
        ]),
      );
    });

    it("should not return categories from a different workspace", async () => {
      const result = await getTaskCategorySummaries();

      const ids = result.map((cat) => cat.id);
      expect(ids).not.toContain(3);
      expect(ids).not.toContain(4);
    });

    it("should return an empty array if the current workspace has no categories", async () => {
      await prisma.workspace.create({ data: { id: 3 } });
      (requireSession as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getTaskCategorySummaries();

      expect(result).toHaveLength(0);
    });

    it("should correctly map database fields to DTO format", async () => {
      const result = await getTaskCategorySummaries();

      const firstCategory = result[0];
      expect(firstCategory).toHaveProperty("id");
      expect(firstCategory).toHaveProperty("name");
      expect(firstCategory).not.toHaveProperty("workspaceId");
    });
  });
});
