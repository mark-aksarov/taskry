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
import { exportProjects } from "../project.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("exportProjects", () => {
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

  it("should return projects with valid ProjectCsvDTO", async () => {
    const result = await exportProjects();

    expect(result).toStrictEqual([
      {
        title: "Project 1",
        description: "Description 1",
        deadline: "2030-12-31",
        status: ProjectStatus.active,
        categoryName: "Project Category 1",
        clientEmail: "client-1@test.com",
      },
      {
        title: "Project 2",
        description: "Description 2",
        deadline: "2030-12-30",
        status: ProjectStatus.active,
        categoryName: "Project Category 1",
        clientEmail: "client-1@test.com",
      },
    ]);
  });
});
