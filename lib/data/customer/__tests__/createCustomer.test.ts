import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createCustomers } from "../customer.dal";
import { CUSTOMER_MAX_COUNT } from "../../constants";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createCustomers", () => {
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
    });
  });

  it("should successfully create customers", async () => {
    const inputData = [
      {
        fullName: "Customer 1",
        bio: "Customer 1 bio",
        email: "customer-1@test.com",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com/public-link",
        companyId: 1,
      },
    ];

    const result = await createCustomers(inputData);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      ...inputData[0],
      workspaceId: 1,
    });
  });

  it("should throw NotFoundError if company does not found", async () => {
    const createCustomersPromise = createCustomers([
      {
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 999,
      },
    ]);

    await expect(createCustomersPromise).rejects.toThrow(NotFoundError);
    await expect(createCustomersPromise).rejects.toThrow(/Company not found/i);
  });

  it("should throw AccessDeniedError if company does not belong to the workspace", async () => {
    const createCustomersPromise = createCustomers([
      {
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 2,
      },
    ]);

    await expect(createCustomersPromise).rejects.toThrow(AccessDeniedError);
    await expect(createCustomersPromise).rejects.toThrow(
      /Company access denied/i,
    );
  });

  it("should create customers without optional fields", async () => {
    const result = await createCustomers([
      {
        fullName: "Customer 1",
        email: "customer-1@test.com",
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].fullName).toBe("Customer 1");
  });

  it("should fail when customer limit is reached", async () => {
    const customers = [];

    for (let i = 1; i <= CUSTOMER_MAX_COUNT; i++) {
      customers.push({
        fullName: `Customer ${i}`,
        email: `customer-${i}@test.com`,
        workspaceId: 1,
      });
    }

    await prisma.customer.createMany({
      data: customers,
    });

    await expect(createCustomers(customers)).rejects.toThrow(
      LimitExceededError,
    );

    await prisma.customer.deleteMany();
  });

  describe("RBAC: create customers", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = [
        {
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");

      const result = await createCustomers(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(createInput[0].fullName);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createCustomers(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(createInput[0].fullName);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createCustomers(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
