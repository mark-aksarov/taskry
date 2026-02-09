import {
  users,
  companies,
  customers,
  positions,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import { seed } from "@/prisma/test-utils/seed";
import { getCustomerSummaries } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";

describe("getCustomerSummaries", () => {
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
      taskCategories,
      projectCategories,
    });
  });

  it("should return all customers", async () => {
    const result = await getCustomerSummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          fullName: "Customer 1",
        },
        {
          id: 2,
          fullName: "Customer 2",
        },
      ]),
    );
  });
});
