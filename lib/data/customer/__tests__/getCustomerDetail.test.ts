import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  customers,
  projectCategories,
} from "@/prisma/test-utils/data";

import { getCustomerDetail } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";

describe("getCustomerDetail", () => {
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

  it("should return a valid CustomerDetailDTO", async () => {
    const result = await getCustomerDetail(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      phoneNumber: "123-456-7890",
      imageUrl: "/man.jpg",
      publicLink: "https://example.com/customer-1",
      bio: "Customer 1 bio",
      workspaceId: 1,

      company: {
        name: "Company 1",
      },
    });
  });

  it("should return null", async () => {
    const failure = await getCustomerDetail(999);
    expect(failure).toBeNull();
  });
});
