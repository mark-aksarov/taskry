import {
  createCustomer,
  updateCustomer,
  deleteCustomers,
  getCustomerCount,
} from "../customer.dal";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Customer DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (verifySession as any).mockResolvedValue(mockSession);

    await prisma.workspace.create({ data: { id: 1 } });
    await prisma.company.create({
      data: { id: 1, name: "Company A", workspaceId: 1 },
    });
    await prisma.company.create({
      data: { id: 2, name: "Company B", workspaceId: 1 },
    });

    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          email: "john@ws1.com",
          fullName: "John Doe",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          email: "jane@ws1.com",
          fullName: "Jane Smith",
          companyId: 2,
          workspaceId: 1,
        },
      ],
    });

    await prisma.workspace.create({ data: { id: 2 } });
    await prisma.company.create({
      data: { id: 3, name: "Company C", workspaceId: 2 },
    });

    await prisma.customer.create({
      data: {
        id: 3,
        email: "other@ws2.com",
        fullName: "Other Workspace User",
        companyId: 3,
        workspaceId: 2,
      },
    });
  });

  describe("getCustomerCount", () => {
    it("should return total count of customers for the current workspace", async () => {
      const count = await getCustomerCount();

      expect(count).toBe(2);
    });

    it("should return filtered count when company filter is applied", async () => {
      const count = await getCustomerCount({
        company: [1],
      });

      expect(count).toBe(1);
    });

    it("should return filtered count when multiple companies are selected", async () => {
      const count = await getCustomerCount({
        company: [1, 2],
      });

      expect(count).toBe(2);
    });

    it("should return 0 when filtering by companies from another workspace", async () => {
      const count = await getCustomerCount({
        company: [3],
      });

      expect(count).toBe(0);
    });

    it("should correctly count customers in a different workspace", async () => {
      (verifySession as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 2 },
      });

      const count = await getCustomerCount();

      expect(count).toBe(1);
    });

    it("should return 0 if no customers match the complex filters", async () => {
      const count = await getCustomerCount({
        hasActiveProjects: true,
        company: [],
      });

      expect(count).toBe(0);
    });
  });

  describe("deleteCustomers", () => {
    it("should successfully delete multiple customers in the current workspace", async () => {
      const { count } = await deleteCustomers([1, 2]);

      expect(count).toBe(2);

      const remainingCount = await prisma.customer.count({
        where: { workspaceId: 1 },
      });
      expect(remainingCount).toBe(0);
    });

    it("should delete only own customers even if foreign IDs are provided", async () => {
      const { count } = await deleteCustomers([1, 3]);

      expect(count).toBe(1);

      const foreignCustomer = await prisma.customer.findUnique({
        where: { id: 3 },
      });
      expect(foreignCustomer).not.toBeNull();
      expect(foreignCustomer?.fullName).toBe("Other Workspace User");
    });

    it("should return a count of 0 if no customers were deleted", async () => {
      const { count } = await deleteCustomers([999]);
      expect(count).toBe(0);
    });

    it("should return a count of 0 if trying to delete another workspace's customer exclusively", async () => {
      const { count } = await deleteCustomers([3]);
      expect(count).toBe(0);
    });

    it("should handle an empty array of IDs by returning count 0", async () => {
      const { count } = await deleteCustomers([]);
      expect(count).toBe(0);
    });
  });

  describe("createCustomer", () => {
    it("should successfully create a customer with valid data", async () => {
      const input = {
        id: 4,
        fullName: "New Client",
        email: "new@client.com",
        companyId: 1,
      };

      await createCustomer(input);

      const dbCustomer = await prisma.customer.findFirst({
        where: { email: "new@client.com" },
      });

      expect(dbCustomer).not.toBeNull();
      expect(dbCustomer?.fullName).toBe("New Client");
      expect(dbCustomer?.workspaceId).toBe(1);
    });

    it("should throw an error if the company belongs to another workspace", async () => {
      const input = {
        fullName: "Infiltrator",
        email: "hacker@test.com",
        companyId: 3,
      };

      await expect(createCustomer(input)).rejects.toThrow();

      const dbCustomer = await prisma.customer.findFirst({
        where: { email: "hacker@test.com" },
      });
      expect(dbCustomer).toBeNull();
    });

    it("should fail if session is missing", async () => {
      (verifySession as any).mockRejectedValue(new Error("Unauthorized"));

      const input = {
        fullName: "No Session",
        email: "none@test.com",
        companyId: 1,
      };

      await expect(createCustomer(input)).rejects.toThrow("Unauthorized");
    });

    it("should fail if mandatory fields are missing (database level)", async () => {
      const input = {
        email: "incomplete@test.com",
      } as any;

      await expect(createCustomer(input)).rejects.toThrow();
    });
  });

  describe("updateCustomer", () => {
    it("should successfully update a customer within the same workspace", async () => {
      const input = {
        id: 1,
        fullName: "John Updated",
        companyId: 1,
      };

      await updateCustomer(input);

      const updated = await prisma.customer.findUnique({ where: { id: 1 } });
      expect(updated?.fullName).toBe("John Updated");
      expect(updated?.companyId).toBe(1);
    });

    it("should throw an error if the customer belongs to another workspace", async () => {
      const input = {
        id: 3,
        fullName: "Attempt to hack",
      };

      await expect(updateCustomer(input)).rejects.toThrow();
    });

    it("should throw an error if trying to move customer to a company in another workspace", async () => {
      const input = {
        id: 1,
        companyId: 3,
      };

      await expect(updateCustomer(input)).rejects.toThrow();

      const original = await prisma.customer.findUnique({ where: { id: 1 } });
      expect(original?.companyId).not.toBe(3);
    });

    it("should fail if session is invalid", async () => {
      (verifySession as any).mockRejectedValue(new Error("Unauthorized"));

      const input = { id: 1, fullName: "New Name" };

      await expect(updateCustomer(input)).rejects.toThrow("Unauthorized");
    });
  });
});
