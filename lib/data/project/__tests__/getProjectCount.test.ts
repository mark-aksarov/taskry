import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { loginAs } from "@/lib/test-utils/auth";
import { getProjectCount } from "../project.dal";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getProjectCount", () => {
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

  it("should return total count of projects", async () => {
    const count = await getProjectCount();
    expect(count).toBe(2);
  });
});
