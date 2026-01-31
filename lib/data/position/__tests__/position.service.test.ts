import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { getPositionSummaries } from "../position.service";
import { vi, describe, beforeEach, beforeAll, it, expect } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Position Service", () => {
  beforeEach(async () => {
    await prisma.position.deleteMany();
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

  describe("getPositionSummaries", () => {
    it("should return all position summaries as a list of valid PositionSummaryDTOs", async () => {
      await prisma.position.createMany({
        data: [
          { id: 1, name: "Position 1", workspaceId: 1 },
          { id: 2, name: "Position 2", workspaceId: 1 },
        ],
      });

      const result = await getPositionSummaries();

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            name: "Position 1",
          },
          {
            id: 2,
            name: "Position 2",
          },
        ]),
      );
    });

    it("should return empty array", async () => {
      const result = await getPositionSummaries();
      expect(result).toHaveLength(0);
    });
  });
});
