import {
  seedUsers,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedProjects,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { getProjectSummaries } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getProjectSummaries", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedProjectCategories();
    await seedTaskCategories();
    await seedCompanies();
    await seedCustomers();
    await seedProjects();
  });

  it("should return all projects", async () => {
    const result = await getProjectSummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          title: "Project 1",
        },
        {
          id: 2,
          title: "Project 2",
        },
      ]),
    );
  });
});
