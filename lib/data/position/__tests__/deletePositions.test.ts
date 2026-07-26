import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { members } from "@/prisma/seed/test-data";
import { deletePositions } from "../position.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { UnauthorizedError } from "../../utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("deletePositions", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await setupAuth("user-1");
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
          organizationId: "org-1",
        },
        {
          id: 4,
          name: "Position 4",
          organizationId: "org-1",
        },
      ],
    });

    const result = await deletePositions([3, 4]);

    expect(result.count).toBe(2);
  });

  it("should not delete positions from a different organization", async () => {
    await prisma.position.createMany({
      data: [
        {
          id: 3,
          name: "Position 3",
          organizationId: "org-2",
        },
      ],
    });

    const result = await deletePositions([3]);
    expect(result.count).toBe(0);
  });

  it("should only delete positions belonging to the current organization", async () => {
    await prisma.position.createMany({
      data: [
        {
          id: 3,
          name: "Position 3",
          organizationId: "org-1",
        },
        {
          id: 4,
          name: "Position 4",
          organizationId: "org-2",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.position.create({
        data: {
          id: 3,
          name: "Position 3",
          organizationId: "org-1",
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deletePositions([3]);
      expect(result.count).toBe(1);
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deletePositions([3]);
      expect(result.count).toBe(1);
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deletePositions([3])).rejects.toThrow(UnauthorizedError);
    });
  });
});
