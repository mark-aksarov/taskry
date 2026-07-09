import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  customers,
  projectCategories,
} from "@/prisma/seed/test-data";

import { getCustomerCount } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getCustomerCount", () => {
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
      customers,
    });
  });

  it("should return total count of customers", async () => {
    const count = await getCustomerCount();
    expect(count).toBe(2);
  });
});
