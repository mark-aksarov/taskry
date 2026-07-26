import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { createPositions } from "../position.dal";
import { POSITION_MAX_COUNT } from "../../constants";
import { beforeAll, describe, expect, it } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, organizations } from "@/prisma/seed/test-data";
import { LimitExceededError, UnauthorizedError } from "../../utils/error";

describe("createPositions", () => {
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

  it("should successfully create positions", async () => {
    const input = [
      {
        name: "Position 3",
      },
      {
        name: "Position 4",
      },
    ];

    const result = await createPositions(input);

    expect(result).toHaveLength(2);

    expect(result).toMatchObject([
      {
        name: "Position 3",
      },
      {
        name: "Position 4",
      },
    ]);
  });

  it("should fail when position limit is reached", async () => {
    const positions = [];

    for (let i = 1; i <= POSITION_MAX_COUNT; i++) {
      positions.push({
        name: `Position ${i + 1}`,
        organizationId: "org-1",
      });
    }

    await prisma.position.createMany({
      data: positions,
    });

    await expect(createPositions(positions)).rejects.toThrow(
      LimitExceededError,
    );

    await prisma.position.deleteMany();
  });

  describe("RBAC: create positions", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      return {
        input: [
          {
            name: "Position 3",
          },
        ],
      };
    };

    it("should succeed for owner", async () => {
      const { input } = await setup("user-1");

      const result = await createPositions(input);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(input[0].name);
    });

    it("should succeed for member", async () => {
      const { input } = await setup("user-2");

      const result = await createPositions(input);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(input[0].name);
    });

    it("should fail for anonymous", async () => {
      const { input } = await setup();

      await expect(createPositions(input)).rejects.toThrow(UnauthorizedError);
    });
  });
});
