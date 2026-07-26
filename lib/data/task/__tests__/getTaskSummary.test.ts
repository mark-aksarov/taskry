import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
  projects,
  tasks,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getTaskSummary } from "../task.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getTaskSummary", () => {
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
      tasks,
    });

    await loginAs("user-1");
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
