import {
  seedUsers,
  seedPositions,
  seedWorkspaces,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { getProjectCategorySummaries } from "../projectCategory.dal";

describe("getProjectCategorySummaries", () => {
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
    await prisma.projectCategory.deleteMany();
  });

  it("should return all project category summaries as a list of valid ProjectCategorySummaryDTOs", async () => {
    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 1 },
      ],
    });

    const result = await getProjectCategorySummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Project Category 1",
        },
        {
          id: 2,
          name: "Project Category 2",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await getProjectCategorySummaries();
    expect(result).toHaveLength(0);
  });
});
