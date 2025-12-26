import {
  createTaskCategory,
  getTaskCategorySummaries,
} from "../taskCategory.dal";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("TaskCategory DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

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
      (getSessionOrThrow as any).mockResolvedValue({
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

  describe("createTaskCategory", () => {
    it("should successfully create a task category and automatically assign the workspaceId", async () => {
      const input = {
        name: "Urgent Tasks",
      };

      const result = await createTaskCategory(input);

      expect(result).toBeDefined();
      expect(result.name).toBe("Urgent Tasks");
      expect(result.workspaceId).toBe(1);

      const dbCategory = await prisma.taskCategory.findUnique({
        where: { id: result.id },
      });
      expect(dbCategory).not.toBeNull();
      expect(dbCategory?.workspaceId).toBe(1);
    });

    it("should overwrite any workspaceId provided in the input with the session workspaceId", async () => {
      const input = {
        name: "Security Test Category",
        workspaceId: 2,
      } as any;

      const result = await createTaskCategory(input);

      expect(result.workspaceId).toBe(1);
      expect(result.workspaceId).not.toBe(2);
    });

    it("should throw a database error if the category name is missing", async () => {
      const input = {} as any;

      await expect(createTaskCategory(input)).rejects.toThrow();
    });
  });
});
