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
import { getTaskCount } from "../task.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getTaskCount", () => {
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

  it("should return the total count of tasks for the current organization", async () => {
    const count = await getTaskCount();
    expect(count).toBe(2);
  });
});
