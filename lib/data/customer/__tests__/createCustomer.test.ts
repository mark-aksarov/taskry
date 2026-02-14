import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import { createCustomer } from "../customer.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { AccessDeniedError, NotFoundError } from "../../utils/error";

describe("createCustomer", () => {
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

  it("should successfully create a customer", async () => {
    const inputData = {
      fullName: "Customer 1",
      bio: "Customer 1 bio",
      email: "customer-1@test.com",
      phoneNumber: "123-456-7890",
      publicLink: "https://example.com/public-link",
      companyId: 1,
    };

    const result = await createCustomer(inputData);

    expect(result).toBeDefined();
    expect(result).toMatchObject({
      ...inputData,
      workspaceId: 1,
    });
  });

  it("should throw NotFoundError if company does not found", async () => {
    const createCustomerPromise = createCustomer({
      fullName: "Customer 1",
      email: "customer-1@test.com",
      companyId: 999,
    });

    await expect(createCustomerPromise).rejects.toThrow(NotFoundError);
    await expect(createCustomerPromise).rejects.toThrow(/Company not found/i);
  });

  it("should throw AccessDeniedError if company does not belong to the workspace", async () => {
    const createCustomerPromise = createCustomer({
      fullName: "Customer 1",
      email: "customer-1@test.com",
      companyId: 2,
    });

    await expect(createCustomerPromise).rejects.toThrow(AccessDeniedError);
    await expect(createCustomerPromise).rejects.toThrow(
      /Company access denied/i,
    );
  });

  it("should create a customer without optional fields", async () => {
    const result = await createCustomer({
      fullName: "Customer 1",
      email: "customer-1@test.com",
    });

    expect(result).toBeDefined();
    expect(result.fullName).toBe("Customer 1");
  });

  describe("RBAC: create customer", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createCustomer(createInput);
      expect(result).toBeDefined();
      expect(result.fullName).toBe(createInput.fullName);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createCustomer(createInput);
      expect(result).toBeDefined();
      expect(result.fullName).toBe(createInput.fullName);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createCustomer(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
