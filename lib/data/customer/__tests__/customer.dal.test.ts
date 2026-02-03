import {
  createCustomer,
  updateCustomer,
  deleteCustomers,
  getCustomerCount,
} from "../customer.dal";

import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../../utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { describe, it, expect, beforeEach, vi, beforeAll } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Customer DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.customer.deleteMany();
  });

  beforeAll(async () => {
    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }, { id: 2 }] });

    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 2 },
      ],
    });

    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 2 },
      ],
    });

    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 2 },
      ],
    });

    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          role: "owner",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "guest",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
          role: "manager",
          workspaceId: 2,
        },
      ],
    });
  });

  describe("getCustomerCount", () => {
    it("should return total count of customers", async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer 1",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer 2",
            email: "customer-2@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 3,
            fullName: "Customer 3",
            email: "customer-2@test.com",
            companyId: 1,
            workspaceId: 2,
          },
        ],
      });

      const count = await getCustomerCount();
      expect(count).toBe(2);
    });
  });

  describe("createCustomer", () => {
    it("should successfully create a customer", async () => {
      const inputData = {
        fullName: "Customer 1",
        bio: "Customer 1 bio",
        imageUrl: "https://example.com/image.jpg",
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

    it("should throw error if company does not belong to the workspace", async () => {
      const createProjectPromise = createCustomer({
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 2,
      });

      await expect(createProjectPromise).rejects.toThrow(AccessDeniedError);
      await expect(createProjectPromise).rejects.toThrow(
        /Company access denied or not found/i,
      );
    });

    it("should create a customer without optional fields", async () => {
      const result = await createCustomer({
        fullName: "Customer 1",
        email: "customer-1@test.com",
        companyId: 1,
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

  describe("updateCustomer", () => {
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

  describe("deleteCustomers", () => {
    it("should successfully delete customers", async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer 1",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer 2",
            email: "customer-2@test.com",
            companyId: 1,
            workspaceId: 1,
          },
        ],
      });

      const result = await deleteCustomers([1, 2]);

      expect(result.count).toBe(2);
      const remainingCustomers = await prisma.customer.findMany();

      expect(remainingCustomers).toHaveLength(0);
    });

    it("should not delete customers from a different workspace", async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer 1",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 2,
          },
        ],
      });

      const result = await deleteCustomers([1]);

      expect(result.count).toBe(0);
    });

    it("should only delete customers belonging to the current workspace", async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer 1",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer 2",
            email: "customer-2@test.com",
            companyId: 2,
            workspaceId: 2,
          },
        ],
      });

      const result = await deleteCustomers([1, 2]);
      expect(result.count).toBe(1);
    });

    it("should return 0 if an empty array is provided", async () => {
      const result = await deleteCustomers([]);
      expect(result.count).toBe(0);
    });

    describe("RBAC: delete customers", () => {
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
      };

      it("should succeed for owner", async () => {
        await setup("user-1", "owner");
        const result = await deleteCustomers([1]);
        expect(result.count).toBe(1);
      });

      it("should fail for user", async () => {
        await setup("user-2", "user");
        const result = await deleteCustomers([1]);
        expect(result.count).toBe(1);
      });

      it("should fail for guest", async () => {
        await setup("user-3", "guest");
        await expect(deleteCustomers([1])).rejects.toThrow(AccessDeniedError);
      });
    });
  });
});
