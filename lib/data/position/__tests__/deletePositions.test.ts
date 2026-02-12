import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-utils/seed";
import { deletePositions } from "../position.dal";
import { AccessDeniedError } from "../../utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/test-utils/data";

describe("deletePositions", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
    });
  });

  afterEach(async () => {
    await prisma.position.deleteMany();
  });

  it("should successfully delete positions", async () => {
    await prisma.position.createMany({
      data: [
        {
          id: 3,
          name: "Position 3",
          workspaceId: 1,
        },
        {
          id: 4,
          name: "Position 4",
          workspaceId: 1,
        },
      ],
    });

    const result = await deletePositions([3, 4]);

    expect(result.count).toBe(2);
  });

  it("should not delete positions from a different workspace", async () => {
    await prisma.position.createMany({
      data: [
        {
          id: 3,
          name: "Position 3",
          workspaceId: 2,
        },
      ],
    });

    const result = await deletePositions([3]);
    expect(result.count).toBe(0);
  });

  it("should only delete positions belonging to the current workspace", async () => {
    await prisma.position.createMany({
      data: [
        {
          id: 3,
          name: "Position 3",
          workspaceId: 1,
        },
        {
          id: 4,
          name: "Position 4",
          workspaceId: 2,
        },
      ],
    });

    const result = await deletePositions([3, 4]);
    expect(result.count).toBe(1);
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deletePositions([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete positions", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.position.create({
        data: {
          id: 3,
          name: "Position 3",
          workspaceId: 1,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deletePositions([3]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deletePositions([3]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deletePositions([3])).rejects.toThrow(AccessDeniedError);
    });
  });
});
