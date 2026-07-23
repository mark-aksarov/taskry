import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  clients,
  projectCategories,
} from "@/prisma/seed/test-data";

import { getClientCount } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientCount", () => {
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
      taskCategories,
      projectCategories,
      clients,
    });
  });

  it("should return total count of clients", async () => {
    const count = await getClientCount();
    expect(count).toBe(2);
  });
});
