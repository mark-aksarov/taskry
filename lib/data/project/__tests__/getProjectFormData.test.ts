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

import { getProjectFormData } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getProjectFormData", () => {
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
    const result = await getProjectFormData(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      title: "Project 1",
      description: "Description 1",
      deadline: new Date("2025-12-31"),
      status: ProjectStatus.active,
      categoryId: 1,
      customerId: 1,
    });
  });

  it("should return null", async () => {
    const failure = await getProjectFormData(999);
    expect(failure).toBeNull();
  });
});
