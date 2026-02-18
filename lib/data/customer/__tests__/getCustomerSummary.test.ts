import {
  users,
  positions,
  companies,
  workspaces,
  customers,
} from "@/prisma/test-utils/data";

import { seed } from "@/prisma/test-utils/seed";
import { getCustomerSummary } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";

describe("getCustomerSummary", () => {
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
      customers,
    });
  });

  it("should return a valid CustomerSummaryDTO", async () => {
    const result = await getCustomerSummary(1);
    expect(result).toStrictEqual({ id: 1, fullName: "Customer 1" });
  });

  it("should return null", async () => {
    const failure = await getCustomerSummary(999);
    expect(failure).toBeNull();
  });
});
