import {
  users,
  customers,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getCustomers } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getCustomers", () => {
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

  it("should return customers with valid CustomerDTO", async () => {
    const result = await getCustomers();

    expect(result).toStrictEqual([
      {
        id: 1,
        bio: "Customer 1 bio",
        fullName: "Customer 1",
        email: "customer-1@test.com",
        imageUrl: "/man.jpg",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com/customer-1",
        companyId: 1,
      },
      {
        id: 2,
        bio: "Customer 2 bio",
        fullName: "Customer 2",
        email: "customer-2@test.com",
        imageUrl: "/man.jpg",
        phoneNumber: "987-654-3210",
        publicLink: "https://example.com/customer-2",
        companyId: 1,
      },
    ]);
  });
});
