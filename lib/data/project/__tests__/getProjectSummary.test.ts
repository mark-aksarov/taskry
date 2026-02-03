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

import { getProjectSummary } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getProjectSummary", () => {
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

  it("should return a valid ProjectFormDataDTO", async () => {
    const result = await getProjectSummary(1);
    expect(result).toStrictEqual({ id: 1, title: "Project 1" });
  });

  it("should return null", async () => {
    const failure = await getProjectSummary(999);
    expect(failure).toBeNull();
  });
});
