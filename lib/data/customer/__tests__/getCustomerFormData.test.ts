import {
  seedUsers,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { getCustomerFormData } from "../customer.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getCustomerFormData", () => {
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

  it("should return a valid CustomerFormDataDTO", async () => {
    const result = await getCustomerFormData(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      phoneNumber: "123-456-7890",
      imageUrl: "https://example.com/customer-1.jpg",
      publicLink: "https://example.com/customer-1",
      bio: "Customer 1 bio",
      companyId: 1,
    });
  });

  it("should return null", async () => {
    const failure = await getCustomerFormData(999);
    expect(failure).toBeNull();
  });
});
