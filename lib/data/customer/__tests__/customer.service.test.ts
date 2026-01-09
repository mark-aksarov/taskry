import {
  getCustomerList,
  getCustomerFormData,
  getCustomerSummaries,
} from "../customer.service";

import prisma from "@/lib/prisma";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Customer Service", () => {
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

  describe("getCustomerSummaries", () => {
    it("should return all customer summaries for the current workspace", async () => {
      const result = await getCustomerSummaries();

      expect(result).toHaveLength(2);
      expect(result.map((c) => c.fullName)).toContain("John Doe");
      expect(result.map((c) => c.fullName)).toContain("Jane Smith");
    });

    it("should ensure strict isolation between workspaces", async () => {
      (verifySession as any).mockResolvedValue({
        user: { id: "user-2", workspaceId: 2 },
      });

      const result = await getCustomerSummaries();

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe("Other Workspace User");

      expect(result.find((c) => c.id === 1)).toBeUndefined();
    });

    it("should return an empty array if no customers exist in workspace", async () => {
      await prisma.workspace.create({ data: { id: 3 } });
      (verifySession as any).mockResolvedValue({
        user: { id: "user-3", workspaceId: 3 },
      });

      const result = await getCustomerSummaries();

      expect(result).toEqual([]);
    });

    it("should fail if the session is not found", async () => {
      (verifySession as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(getCustomerSummaries()).rejects.toThrow("Unauthorized");
    });
  });

  describe("getCustomerFormData", () => {
    it("should return customer form data when id and workspace match", async () => {
      const result = await getCustomerFormData(1);

      expect(result).toBeDefined();
      expect(result).toMatchObject({
        id: 1,
        fullName: "John Doe",
      });
    });

    it("should return null if customer belongs to a different workspace", async () => {
      const result = await getCustomerFormData(3);
      expect(result).toBeNull();
    });

    it("should return null if customer does not exist", async () => {
      const result = await getCustomerFormData(999);
      expect(result).toBeNull();
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
});
