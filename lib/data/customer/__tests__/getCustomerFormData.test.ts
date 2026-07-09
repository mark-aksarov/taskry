import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  customers,
  projectCategories,
} from "@/prisma/seed/test-data";

import { getCustomerFormData } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getCustomerFormData", () => {
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

  it("should return a valid CustomerFormDataDTO", async () => {
    const result = await getCustomerFormData(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      phoneNumber: "123-456-7890",
      imageUrl: "/man.jpg",
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
