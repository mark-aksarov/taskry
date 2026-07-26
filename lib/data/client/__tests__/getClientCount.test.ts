import {
  users,
  clients,
  members,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClientCount } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientCount", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      users,
      clients,
      members,
      positions,
      companies,
      organizations,
      taskCategories,
      projectCategories,
    });

    await setupAuth("user-1");
  });

  it("should return total count of clients", async () => {
    const count = await getClientCount();
    expect(count).toBe(2);
  });
});
