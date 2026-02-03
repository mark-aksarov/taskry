import {
  seedTasks,
  seedUsers,
  seedProjects,
  seedPositions,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
} from "@/lib/data/utils/test-utils";

import { getTaskSummary } from "../task.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getTaskSummary", () => {
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

  it("should return a valid TaskSummaryDTO", async () => {
    const result = await getTaskSummary(1);
    expect(result).toStrictEqual({ id: 1, title: "Task 1" });
  });

  it("should return null", async () => {
    const failure = await getTaskSummary(999);
    expect(failure).toBeNull();
  });
});
