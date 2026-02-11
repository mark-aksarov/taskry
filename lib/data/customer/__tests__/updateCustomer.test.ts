import {
  users,
  companies,
  positions,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-utils/seed";
import { updateCustomer } from "../customer.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { AccessDeniedError, NotFoundError } from "../../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateCustomer", () => {
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

  afterEach(async () => {
    await prisma.customer.deleteMany();
  });

  it("should successfully update a customer", async () => {
    const customerData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      companyId: 1,
    };

    await prisma.customer.create({
      data: {
        ...customerData,
        workspaceId: 1,
      },
    });

    const result = await updateCustomer({
      ...customerData,
      fullName: "Updated Customer Full Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.fullName).toBe("Updated Customer Full Name");
  });

  it("should throw NotFoundError if company does not found", async () => {
    const customerData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      companyId: 1,
    };

    await prisma.customer.create({
      data: {
        ...customerData,
        workspaceId: 1,
      },
    });

    const updateCustomerPromise = updateCustomer({
      ...customerData,
      companyId: 999,
    });

    await expect(updateCustomerPromise).rejects.toThrow(NotFoundError);
    await expect(updateCustomerPromise).rejects.toThrow(/Company not found/i);
  });

  it("should throw AccessDeniedError if company does not belong to the workspace", async () => {
    const customerData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      companyId: 1,
    };

    await prisma.customer.create({
      data: {
        ...customerData,
        workspaceId: 1,
      },
    });

    const updateCustomerPromise = updateCustomer({
      ...customerData,
      companyId: 2,
    });

    await expect(updateCustomerPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateCustomerPromise).rejects.toThrow(
      /Company access denied/i,
    );
  });

  it("should throw an error when trying to update a customer from another workspace", async () => {
    const customerData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Customer 1",
      email: "customer-1@test.com",
      companyId: 1,
    };

    await prisma.customer.create({
      data: {
        ...customerData,
        workspaceId: 2,
      },
    });

    const updateCustomerPromise = updateCustomer({
      ...customerData,
      fullName: "Updated Customer Full Name",
    });

    await expect(updateCustomerPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateCustomerPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update customer", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const customerData = {
        id: 1,
        bio: null,
        phoneNumber: null,
        publicLink: null,
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
      };

      await prisma.customer.create({
        data: {
          ...customerData,
          workspaceId: 1,
        },
      });

      return {
        updateInput: {
          ...customerData,
          fullName: "Updated Customer Full Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateCustomer(updateInput);
      expect(result.fullName).toBe(updateInput.fullName);
    });

    it("should fail for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateCustomer(updateInput);
      expect(result.fullName).toBe(updateInput.fullName);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateCustomer(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
