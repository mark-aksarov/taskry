import {
  seedUsers,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { getCustomerSummaries } from "../customer.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getCustomerSummaries", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedProjectCategories();
    await seedTaskCategories();
    await seedCompanies();
    await seedCustomers();
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
