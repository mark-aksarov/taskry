import {
  users,
  projects,
  clients,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { getProjectDetail } from "../project.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjectDetail", () => {
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

  it("should return a valid ProjectDetailDTO", async () => {
    const result = await getProjectDetail(1);

    expect(result).toStrictEqual({
      id: 1,
      title: "Project 1",
      description: "Description 1",
      deadline: new Date("2030-12-31").toISOString(),
      status: ProjectStatus.active,
      categoryId: 1,
      clientId: 1,

      creator: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "/man.jpg",
      },

      client: {
        id: 1,
        fullName: "Client 1",
      },

      category: {
        id: 1,
        name: "Project Category 1",
      },

      tasks: {
        active: 0,
        completed: 0,
        pending: 0,
        total: 0,
      },
    });
  });

  it("should return null", async () => {
    const failure = await getProjectDetail(999);
    expect(failure).toBeNull();
  });
});
