import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { getPositions } from "../position.dal";
import { users, workspaces } from "@/prisma/seed/test-data";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("getPositions", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions: [
        { id: 1, name: "Position 1", workspaceId: 1 },
        { id: 2, name: "Position 2", workspaceId: 2 },
        { id: 3, name: "Position 3", workspaceId: 1 },
      ],
      users,
    });
  });

  afterEach(async () => {
    await prisma.position.deleteMany();
  });

  it("should return all positions as a list of valid PositionDTOs", async () => {
    const result = await getPositions();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Position 1",
        },
        {
          id: 3,
          name: "Position 3",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await getPositions();
    expect(result).toHaveLength(0);
  });
});
