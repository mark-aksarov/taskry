import {
  users,
  companies,
  clients,
  positions,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClientSummaries } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientSummaries", () => {
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
      clients,
      taskCategories,
      projectCategories,
    });
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
