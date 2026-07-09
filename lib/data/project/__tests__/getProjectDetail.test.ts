import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getProjectDetail } from "../project.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjectDetail", () => {
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

  it("should return a valid ProjectDetailDTO", async () => {
    const result = await getProjectDetail(1);

    expect(result).toStrictEqual({
      id: 1,
      title: "Project 1",
      description: "Description 1",
      deadline: new Date("2030-12-31").toISOString(),
      status: ProjectStatus.active,
      categoryId: 1,
      customerId: 1,

      creator: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "/man.jpg",
      },

      customer: {
        id: 1,
        fullName: "Customer 1",
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
