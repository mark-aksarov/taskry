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
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { getProjectSummary } from "../project.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjectSummary", () => {
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

  it("should return a valid ProjectSummaryDTO", async () => {
    const result = await getProjectSummary(1);
    expect(result).toStrictEqual({ id: 1, title: "Project 1" });
  });

  it("should return null", async () => {
    const failure = await getProjectSummary(999);
    expect(failure).toBeNull();
  });
});
