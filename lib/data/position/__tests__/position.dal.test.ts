import prisma from "@/lib/prisma";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";
import { createPosition, getPositionSummaries } from "../position.dal";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("Position DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

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
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getPositionSummaries();

      expect(result).toHaveLength(0);
    });
  });

  describe("createPosition", () => {
    it("should successfully create a position and automatically inject the workspaceId", async () => {
      const input = {
        name: "Senior Developer",
      };

      const result = await createPosition(input);

      expect(result).toBeDefined();
      expect(result.name).toBe("Senior Developer");
      expect(result.workspaceId).toBe(1);

      const dbPosition = await prisma.position.findUnique({
        where: { id: result.id },
      });
      expect(dbPosition?.workspaceId).toBe(1);
    });

    it("should prevent overriding the workspaceId from the input", async () => {
      const input = {
        name: "Malicious Position",
        workspaceId: 99,
      } as any;

      const result = await createPosition(input);

      expect(result.workspaceId).toBe(1);
      expect(result.workspaceId).not.toBe(99);
    });

    it("should throw an error if the position name is missing (Prisma validation)", async () => {
      const input = {} as any;

      await expect(createPosition(input)).rejects.toThrow();
    });
  });
});
