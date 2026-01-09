import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { getPositionSummaries } from "../position.service";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Position DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (verifySession as any).mockResolvedValue(mockSession);

    await prisma.workspace.create({ data: { id: 1 } });
    await prisma.workspace.create({ data: { id: 2 } });
    await prisma.position.createMany({
      data: [
        { id: 1, name: "Position 1", workspaceId: 1 },
        { id: 2, name: "Position 2", workspaceId: 1 },
        { id: 3, name: "Position 3", workspaceId: 2 },
        { id: 4, name: "Position 4", workspaceId: 2 },
      ],
    });
  });

  describe("getPositionSummaries", () => {
    it("should return all position summaries belonging to the current workspace", async () => {
      const result = await getPositionSummaries();

      expect(result).toHaveLength(2);

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: 1, name: "Position 1" }),
          expect.objectContaining({ id: 2, name: "Position 2" }),
        ]),
      );
    });

    it("should not return positions belonging to a different workspace", async () => {
      const result = await getPositionSummaries();

      const ids = result.map((p) => p.id);
      expect(ids).not.toContain(3);
      expect(ids).not.toContain(4);
    });

    it("should return an empty array if the workspace has no positions", async () => {
      (verifySession as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getPositionSummaries();

      expect(result).toHaveLength(0);
    });
  });
});
