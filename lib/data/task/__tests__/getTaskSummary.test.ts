import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
  tasks,
} from "@/prisma/seed/test-data";

import { getTaskSummary } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getTaskSummary", () => {
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
      tasks,
    });
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
