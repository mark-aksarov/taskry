import { members } from "@/prisma/seed/test-data";
import {
  users,
  positions,
  companies,
  organizations,
  clients,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClientSummary } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientSummary", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
    });

    await setupAuth("user-1");
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
