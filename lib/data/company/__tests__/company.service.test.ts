import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { getCompanySummaries } from "../company.service";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Company Service", () => {
  beforeEach(async () => {
    await prisma.company.deleteMany();
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

  describe("getCompanySummaries", () => {
    it("should return all company summaries as a list of valid CompanySummaryDTOs", async () => {
      await prisma.company.createMany({
        data: [
          { id: 1, name: "Company 1", workspaceId: 1 },
          { id: 2, name: "Company 2", workspaceId: 1 },
        ],
      });

      const result = await getCompanySummaries();

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            name: "Company 1",
          },
          {
            id: 2,
            name: "Company 2",
          },
        ]),
      );
    });

    it("should return empty array", async () => {
      const result = await getCompanySummaries();
      expect(result).toHaveLength(0);
    });
  });
});
