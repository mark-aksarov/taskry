import {
  users,
  projects,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getProjects } from "../project.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjects", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      customers,
      taskCategories,
      projectCategories,
      projects,
    });
  });

  it("should return projects with valid ProjectDTO", async () => {
    const result = await getProjects();

    expect(result).toStrictEqual([
      {
        id: 1,
        title: "Project 1",
        description: "Description 1",
        deadline: new Date("2030-12-31").toISOString(),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      },
      {
        id: 2,
        title: "Project 2",
        description: "Description 2",
        deadline: new Date("2030-12-30").toISOString(),
        status: ProjectStatus.active,
        customerId: 1,
        categoryId: 1,
      },
    ]);
  });
});
