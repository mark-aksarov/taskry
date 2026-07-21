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
import { getProjectSummary } from "../project.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjectSummary", () => {
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

  it("should return a valid ProjectSummaryDTO", async () => {
    const result = await getProjectSummary(1);
    expect(result).toStrictEqual({ id: 1, title: "Project 1" });
  });

  it("should return null", async () => {
    const failure = await getProjectSummary(999);
    expect(failure).toBeNull();
  });
});
