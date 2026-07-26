import {
  users,
  clients,
  projects,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getProjects } from "../project.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjects", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
      taskCategories,
      projectCategories,
      projects,
    });

    await loginAs("user-1");
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
        clientId: 1,
      },
      {
        id: 2,
        title: "Project 2",
        description: "Description 2",
        deadline: new Date("2030-12-30").toISOString(),
        status: ProjectStatus.active,
        clientId: 1,
        categoryId: 1,
      },
    ]);
  });
});
