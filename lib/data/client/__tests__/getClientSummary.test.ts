import {
  users,
  positions,
  companies,
  workspaces,
  clients,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClientSummary } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientSummary", () => {
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
    });
  });

  it("should return a valid ClientSummaryDTO", async () => {
    const result = await getClientSummary(1);
    expect(result).toStrictEqual({ id: 1, fullName: "Client 1" });
  });

  it("should return null", async () => {
    const failure = await getClientSummary(999);
    expect(failure).toBeNull();
  });
});
