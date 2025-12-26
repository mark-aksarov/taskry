import {
  getCustomerList,
  getCustomerFormData,
  getCustomerSummaries,
  getCustomerCount,
  deleteCustomers,
  createCustomer,
  updateCustomer,
} from "../customer.dal";

import prisma from "@/lib/prisma";
import * as mappers from "../customer.mapper";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("Company DAL", () => {
  beforeEach(async () => {
    vi.resetAllMocks();

    await resetDatabase();

    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

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

  describe("getCustomerSummaries", () => {
    it("should return all customer summaries for the current workspace", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapCustomerSummaryToDTO");

      const result = await getCustomerSummaries();

      expect(result).toHaveLength(2);
      expect(result.map((c) => c.fullName)).toContain("John Doe");
      expect(result.map((c) => c.fullName)).toContain("Jane Smith");
      expect(mapperSpy).toHaveBeenCalledTimes(2);
    });

    it("should ensure strict isolation between workspaces", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 2 },
      });

      const result = await getCustomerSummaries();

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Other Workspace User");

      expect(result.find((c) => c.id === 1)).toBeUndefined();
    });

    it("should return an empty array if no customers exist in workspace", async () => {
      await prisma.workspace.create({ data: { id: 3 } });
      (getSessionOrThrow as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getCustomerSummaries();

      expect(result).toEqual([]);
    });

    it("should fail if the session is not found", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(getCustomerSummaries()).rejects.toThrow("Unauthorized");
    });
  });

  describe("getCustomerFormData", () => {
    it("should return customer form data when id and workspace match", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapCustomerFormDataToDTO");

      const result = await getCustomerFormData(1);

      expect(result).toBeDefined();
      expect(mapperSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          fullName: "John Doe",
        }),
      );
    });

    it("should throw 'Customer not found' if customer belongs to a different workspace", async () => {
      await expect(getCustomerFormData(3)).rejects.toThrow(
        "Customer not found",
      );
    });

    it("should throw 'Customer not found' if customer does not exist", async () => {
      await expect(getCustomerFormData(999)).rejects.toThrow(
        "Customer not found",
      );
    });
  });

  describe("getCustomerList", () => {
    it("should return paginated customers for the current workspace", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 1,
        sort: "fullName",
      });

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Jane Smith");

      const secondPage = await getCustomerList({
        page: 2,
        pageSize: 1,
        sort: "fullName",
      });

      expect(secondPage).toHaveLength(1);
      expect(secondPage[0].fullName).toBe("John Doe");
    });

    it("should sort customers by company name", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "company",
      });

      expect(result[0].fullName).toBe("John Doe");
      expect(result[1].fullName).toBe("Jane Smith");
    });

    it("should filter customers by specific companies", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: {
          company: [1],
        },
      });

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("John Doe");
    });

    it("should return multiple customers when filtering by multiple companies", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: {
          company: [1, 2],
        },
      });

      expect(result).toHaveLength(2);
    });

    it("should return empty array when filtering by companies with no customers in current workspace", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: {
          company: [3],
        },
      });

      expect(result).toHaveLength(0);
    });

    it("should return empty array if no customers match the project filters (mocking logic)", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: {
          hasActiveProjects: true,
          company: [],
        },
      });

      expect(result).toHaveLength(0);
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
      (getSessionOrThrow as any).mockResolvedValue({
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
      const count = await deleteCustomers([1, 2]);

      expect(count).toBe(2);

      const remainingCount = await prisma.customer.count({
        where: { workspaceId: 1 },
      });
      expect(remainingCount).toBe(0);
    });

    it("should delete only own customers even if foreign IDs are provided", async () => {
      const count = await deleteCustomers([1, 3]);

      expect(count).toBe(1);

      const foreignCustomer = await prisma.customer.findUnique({
        where: { id: 3 },
      });
      expect(foreignCustomer).not.toBeNull();
      expect(foreignCustomer?.fullName).toBe("Other Workspace User");
    });

    it("should throw an error if no customers were deleted", async () => {
      await expect(deleteCustomers([999])).rejects.toThrow(
        "No customers deleted.",
      );
    });

    it("should throw an error if trying to delete another workspace's customer exclusively", async () => {
      await expect(deleteCustomers([3])).rejects.toThrow(
        "No customers deleted.",
      );
    });

    it("should handle an empty array of IDs", async () => {
      await expect(deleteCustomers([])).rejects.toThrow(
        "No customers deleted.",
      );
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
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

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
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      const input = { id: 1, fullName: "New Name" };

      await expect(updateCustomer(input)).rejects.toThrow("Unauthorized");
    });
  });
});
