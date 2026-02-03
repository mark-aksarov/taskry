import {
  seedUsers,
  seedPositions,
  seedWorkspaces,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { getPositionSummaries } from "../position.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("getPositionSummaries", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
  });

  afterEach(async () => {
    await prisma.position.deleteMany();
  });

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
