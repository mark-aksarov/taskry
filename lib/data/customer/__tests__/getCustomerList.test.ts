import {
  users,
  positions,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { getCustomerList } from "../customer.dal";
import { dates } from "@/lib/data/utils/test-utils";
import { ProjectStatus } from "@/generated/prisma/enums";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach, afterAll } from "vitest";

describe("getCustomerList", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      taskCategories,
      projectCategories,
    });

    return prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 1 },
      ],
    });
  });

  it("should return a valid CustomerListDTO", async () => {
    await prisma.customer.create({
      data: {
        id: 1,
        bio: "Customer 1 bio",
        fullName: "Customer 1",
        email: "customer-1@test.com",
        imageUrl: "https://example.com/customer-1.jpg",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com/customer-1",
        companyId: 1,
        workspaceId: 1,
      },
    });

    const result = await getCustomerList({
      page: 1,
      pageSize: 10,
      sort: "fullName",
    });
    await prisma.customer.deleteMany();

    expect(result).toStrictEqual({
      items: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          phoneNumber: "123-456-7890",
          imageUrl: "https://example.com/customer-1.jpg",
          publicLink: "https://example.com/customer-1",

          company: {
            id: 1,
            name: "Company 1",
          },
        },
      ],
      totalCount: 1,
    });
  });

  it("should return an empty array if no customers", async () => {
    const result = await getCustomerList({
      page: 1,
      pageSize: 10,
      sort: "fullName",
    });

    expect(result.items).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });

  describe("sorting", () => {
    afterEach(async () => {
      await prisma.customer.deleteMany();
    });

    it("should correctly sort customers by fullName", async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer C",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer A",
            email: "customer-2@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 3,
            fullName: "Customer B",
            email: "customer-3@test.com",
            companyId: 1,
            workspaceId: 1,
          },
        ],
      });

      const result = await getCustomerList({
        page: 1,
        pageSize: 50,
        sort: "fullName",
      });

      expect(result.items[0].fullName).toBe("Customer A");
      expect(result.items[1].fullName).toBe("Customer B");
      expect(result.items[2].fullName).toBe("Customer C");
    });

    it("should correctly sort customers by company", async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer A",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer B",
            email: "customer-2@test.com",
            companyId: 2,
            workspaceId: 1,
          },
          {
            id: 3,
            fullName: "Customer C",
            email: "customer-3@test.com",
            companyId: 1,
            workspaceId: 1,
          },
        ],
      });

      const result = await getCustomerList({
        page: 1,
        pageSize: 50,
        sort: "company",
      });

      expect(result.items[0].fullName).toBe("Customer A");
      expect(result.items[1].fullName).toBe("Customer C");
      expect(result.items[2].fullName).toBe("Customer B");
    });
  });

  describe("filtering", () => {
    beforeAll(async () => {
      await prisma.customer.createMany({
        data: [
          {
            id: 1,
            fullName: "Customer A",
            email: "customer-1@test.com",
            companyId: 1,
            workspaceId: 1,
          },
          {
            id: 2,
            fullName: "Customer B",
            email: "customer-2@test.com",
            companyId: 2,
            workspaceId: 1,
          },
          {
            id: 3,
            fullName: "Customer C",
            email: "customer-3@test.com",
            companyId: 2,
            workspaceId: 1,
          },
        ],
      });

      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project A",
            deadline: dates.nextWeek,
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project B",
            deadline: dates.nextWeek,
            creatorId: "user-1",
            categoryId: 1,
            customerId: 2,
            status: ProjectStatus.completed,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project C",
            deadline: dates.overdue,
            creatorId: "user-1",
            categoryId: 1,
            customerId: 3,
            status: ProjectStatus.pending,
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.customer.deleteMany();
      await prisma.project.deleteMany();
    });

    it("should filter customers by query", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { query: "A" },
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].fullName).toBe("Customer A");
    });

    it("should filter customers which have not active projects", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { hasNoActiveProjects: true },
      });

      expect(result.items).toHaveLength(2);
      expect(result.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ fullName: "Customer B" }),
          expect.objectContaining({ fullName: "Customer C" }),
        ]),
      );
    });

    it("should filter customers which have active projects", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { hasActiveProjects: true },
      });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.items[0].fullName).toBe("Customer A");
    });

    it("should filter customers which have overdue projects", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { hasOverdueProjects: true },
      });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.items[0].fullName).toBe("Customer C");
    });

    it("should filter customers which have active OR overdue projects", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: {
          hasActiveProjects: true,
          hasOverdueProjects: true,
        },
      });

      expect(result.totalCount).toBe(2);
      expect(result.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ fullName: "Customer A" }),
          expect.objectContaining({ fullName: "Customer C" }),
        ]),
      );
    });

    it("should filter customers by company", async () => {
      const result = await getCustomerList({
        page: 1,
        pageSize: 10,
        sort: "fullName",
        filters: { companyIds: [1] },
      });

      expect(result.items).toHaveLength(1);
      expect(result.totalCount).toBe(1);
      expect(result.items[0].fullName).toBe("Customer A");
    });
  });

  describe("pagination", () => {
    beforeAll(async () => {
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
            email: "customer-3@test.com",
            companyId: 1,
            workspaceId: 1,
          },
        ],
      });
    });

    afterAll(async () => {
      await prisma.customer.deleteMany();
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await getCustomerList({
        page: 1,
        pageSize: 2,
        sort: "fullName",
      });

      const page2 = await getCustomerList({
        page: 2,
        pageSize: 2,
        sort: "fullName",
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].fullName).toBe("Customer 1");
      expect(page1.items[1].fullName).toBe("Customer 2");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].fullName).toBe("Customer 3");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await getCustomerList({
        page: 99,
        pageSize: 10,
        sort: "fullName",
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
