import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { vi, describe, beforeEach, it, expect, beforeAll } from "vitest";
import { getProjectCategorySummaries } from "../projectCategory.service";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("ProjectCategory Service", () => {
  beforeEach(async () => {
    await prisma.projectCategory.deleteMany();
  });

  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.create({ data: { id: 1 } });

    await prisma.user.create({
      data: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "https://example.com/user-1.jpg",
        email: "user-1@test.com",
        workspaceId: 1,
      },
    });
  });

  describe("getProjectCategorySummaries", () => {
    it("should return all project category summaries as a list of valid ProjectCategorySummaryDTOs", async () => {
      await prisma.projectCategory.createMany({
        data: [
          { id: 1, name: "Project Category 1", workspaceId: 1 },
          { id: 2, name: "Project Category 2", workspaceId: 1 },
        ],
      });

      const result = await getProjectCategorySummaries();

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            name: "Project Category 1",
          },
          {
            id: 2,
            name: "Project Category 2",
          },
        ]),
      );
    });

    it("should return empty array", async () => {
      const result = await getProjectCategorySummaries();
      expect(result).toHaveLength(0);
    });
  });
});
