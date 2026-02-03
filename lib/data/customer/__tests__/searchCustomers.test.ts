import {
  seedUsers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { searchCustomers } from "../customer.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeEach, beforeAll, afterEach } from "vitest";

describe("searchCustomers", () => {
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

  it("should return all customers with valid CustomerSearchDTO", async () => {
    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          imageUrl: "https://example.com/customer-1.jpg",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          imageUrl: "https://example.com/customer-2.jpg",
          companyId: 2,
          workspaceId: 1,
        },
      ],
    });

    const result = await searchCustomers({
      page: 1,
      pageSize: 10,
    });

    expect(result).toEqual({
      items: expect.arrayContaining([
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          imageUrl: "https://example.com/customer-1.jpg",
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          imageUrl: "https://example.com/customer-2.jpg",
        },
      ]),
      totalCount: 2,
    });
  });

  it("should filter customers by query", async () => {
    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          imageUrl: "https://example.com/customer-1.jpg",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          imageUrl: "https://example.com/customer-2.jpg",
          companyId: 2,
          workspaceId: 1,
        },
        {
          id: 3,
          fullName: "Customer 11",
          email: "customer-11@test.com",
          imageUrl: "https://example.com/customer-11.jpg",
          companyId: 1,
          workspaceId: 1,
        },
      ],
    });

    const result = await searchCustomers({
      page: 1,
      pageSize: 10,
      query: "Customer 1",
    });

    expect(result.items).toHaveLength(2);
    expect(result.items).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          imageUrl: "https://example.com/customer-1.jpg",
        },
        {
          id: 3,
          fullName: "Customer 11",
          email: "customer-11@test.com",
          imageUrl: "https://example.com/customer-11.jpg",
        },
      ]),
    );
  });

  describe("pagination", () => {
    beforeEach(async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer 1",
            email: "customer-1@test.com",
            imageUrl: "https://example.com/customer-1.jpg",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer 2",
            email: "customer-2@test.com",
            imageUrl: "https://example.com/customer-2.jpg",
            companyId: 2,
            workspaceId: 1,
          },
          {
            id: 3,
            fullName: "Customer 3",
            email: "customer-3@test.com",
            imageUrl: "https://example.com/customer-3.jpg",
            companyId: 1,
            workspaceId: 1,
          },
        ],
      });
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await searchCustomers({
        page: 1,
        pageSize: 2,
      });

      const page2 = await searchCustomers({
        page: 2,
        pageSize: 2,
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            fullName: "Customer 1",
            email: "customer-1@test.com",
            imageUrl: "https://example.com/customer-1.jpg",
          },
          {
            id: 2,
            fullName: "Customer 2",
            email: "customer-2@test.com",
            imageUrl: "https://example.com/customer-2.jpg",
          },
        ]),
      );

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items).toEqual(
        expect.arrayContaining([
          {
            id: 3,
            fullName: "Customer 3",
            email: "customer-3@test.com",
            imageUrl: "https://example.com/customer-3.jpg",
          },
        ]),
      );
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await searchCustomers({
        page: 99,
        pageSize: 10,
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
