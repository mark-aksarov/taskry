import { members } from "@/prisma/seed/test-data";
import {
  users,
  companies,
  clients,
  positions,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { getClientSummaries } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientSummaries", () => {
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
    });

    await setupAuth("user-1");
  });

  it("should return all clients", async () => {
    const result = await getClientSummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          fullName: "Client 1",
        },
        {
          id: 2,
          fullName: "Client 2",
        },
      ]),
    );
  });
});
