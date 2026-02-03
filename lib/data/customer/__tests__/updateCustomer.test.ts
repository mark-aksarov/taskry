import {
  seedUsers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { updateCustomer } from "../customer.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { AccessDeniedError, NotFoundError } from "../../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateCustomer", () => {
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
  });

  afterEach(async () => {
    await prisma.customer.deleteMany();
  });

  it("should successfully update a customer", async () => {
    await prisma.customer.create({
      data: {
        id: 1,
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
        workspaceId: 1,
      },
    });

    const result = await updateCustomer({
      id: 1,
      fullName: "Updated Customer Full Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.fullName).toBe("Updated Customer Full Name");
  });

  it("should throw NotFoundError if company does not found", async () => {
    await prisma.customer.create({
      data: {
        id: 1,
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
        workspaceId: 1,
      },
    });

    const updateCustomerPromise = updateCustomer({
      id: 1,
      companyId: 999,
    });

    await expect(updateCustomerPromise).rejects.toThrow(NotFoundError);
    await expect(updateCustomerPromise).rejects.toThrow(/Company not found/i);
  });

  it("should throw AccessDeniedError if company does not belong to the workspace", async () => {
    await prisma.customer.create({
      data: {
        id: 1,
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
        workspaceId: 1,
      },
    });

    const updateCustomerPromise = updateCustomer({
      id: 1,
      companyId: 2,
    });

    await expect(updateCustomerPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateCustomerPromise).rejects.toThrow(
      /Company access denied/i,
    );
  });

  it("should throw an error when trying to update a customer from another workspace", async () => {
    await prisma.customer.create({
      data: {
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
        workspaceId: 2,
      },
    });

    const updateCustomerPromise = updateCustomer({
      id: 1,
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

      await prisma.customer.create({
        data: {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
      });

      return {
        updateInput: {
          id: 1,
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
