import {
  seedTasks,
  seedUsers,
  seedProjects,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { getTaskFormData } from "../task.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("getTaskFormData", () => {
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
    await seedTasks();
  });

  it("should return a valid TaskFormDataDTO", async () => {
    const result = await getTaskFormData(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      title: "Task 1",
      description: "Description 1",
      deadline: new Date("2025-12-31"),
      status: TaskStatus.active,
      projectId: 1,
      projectStatus: ProjectStatus.active,
      categoryId: 1,
      assigneeId: "user-1",
    });
  });

  it("should return null", async () => {
    const failure = await getTaskFormData(999);
    expect(failure).toBeNull();
  });
});
