import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createPositions } from "../position.dal";
import { POSITION_MAX_COUNT } from "../../constants";
import { beforeAll, describe, expect, it } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { AccessDeniedError, LimitExceededError } from "../../utils/error";

describe("createPositions", () => {
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
        workspaceId: 1,
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      return {
        input: [
          {
            name: "Position 3",
          },
        ],
      };
    };

    it("should succeed for owner", async () => {
      const { input } = await setup("user-1", "owner");

      const result = await createPositions(input);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(input[0].name);
    });

    it("should succeed for user", async () => {
      const { input } = await setup("user-2", "user");

      const result = await createPositions(input);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(input[0].name);
    });

    it("should fail for guest", async () => {
      const { input } = await setup("user-3", "guest");

      await expect(createPositions(input)).rejects.toThrow(AccessDeniedError);
    });
  });
});
