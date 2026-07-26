import { members } from "@/prisma/seed/test-data";
import {
  users,
  companies,
  positions,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { searchClients } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeEach, beforeAll, afterEach } from "vitest";

describe("searchClients", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      taskCategories,
      projectCategories,
    });

    await setupAuth("user-1");
  });

  afterEach(async () => {
    await prisma.client.deleteMany();
  });

  it("should return all clients with valid ClientSearchDTO", async () => {
    await prisma.client.createMany({
      data: [
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          imageUrl: "https://example.com/client-1.jpg",
          companyId: 1,
          organizationId: "org-1",
        },
        {
          id: 2,
          fullName: "Client 2",
          email: "client-2@test.com",
          imageUrl: "https://example.com/client-2.jpg",
          companyId: 2,
          organizationId: "org-1",
        },
      ],
    });

    const result = await searchClients({
      page: 1,
      pageSize: 10,
    });

    expect(result).toEqual({
      items: expect.arrayContaining([
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          imageUrl: "https://example.com/client-1.jpg",
        },
        {
          id: 2,
          fullName: "Client 2",
          email: "client-2@test.com",
          imageUrl: "https://example.com/client-2.jpg",
        },
      ]),
      totalCount: 2,
    });
  });

  it("should filter clients by query", async () => {
    await prisma.client.createMany({
      data: [
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          imageUrl: "https://example.com/client-1.jpg",
          companyId: 1,
          organizationId: "org-1",
        },
        {
          id: 2,
          fullName: "Client 2",
          email: "client-2@test.com",
          imageUrl: "https://example.com/client-2.jpg",
          companyId: 2,
          organizationId: "org-1",
        },
        {
          id: 3,
          fullName: "Client 11",
          email: "client-11@test.com",
          imageUrl: "https://example.com/client-11.jpg",
          companyId: 1,
          organizationId: "org-1",
        },
      ],
    });

    const result = await searchClients({
      page: 1,
      pageSize: 10,
      query: "Client 1",
    });

    expect(result.items).toHaveLength(2);
    expect(result.items).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          imageUrl: "https://example.com/client-1.jpg",
        },
        {
          id: 3,
          fullName: "Client 11",
          email: "client-11@test.com",
          imageUrl: "https://example.com/client-11.jpg",
        },
      ]),
    );
  });

  describe("pagination", () => {
    beforeEach(async () => {
      await prisma.client.createMany({
        data: [
          {
            id: 1,
            fullName: "Client 1",
            email: "client-1@test.com",
            imageUrl: "https://example.com/client-1.jpg",
            companyId: 1,
            organizationId: "org-1",
          },
          {
            id: 2,
            fullName: "Client 2",
            email: "client-2@test.com",
            imageUrl: "https://example.com/client-2.jpg",
            companyId: 2,
            organizationId: "org-1",
          },
          {
            id: 3,
            fullName: "Client 3",
            email: "client-3@test.com",
            imageUrl: "https://example.com/client-3.jpg",
            companyId: 1,
            organizationId: "org-1",
          },
        ],
      });
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await searchClients({
        page: 1,
        pageSize: 2,
      });

      const page2 = await searchClients({
        page: 2,
        pageSize: 2,
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            fullName: "Client 1",
            email: "client-1@test.com",
            imageUrl: "https://example.com/client-1.jpg",
          },
          {
            id: 2,
            fullName: "Client 2",
            email: "client-2@test.com",
            imageUrl: "https://example.com/client-2.jpg",
          },
        ]),
      );

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items).toEqual(
        expect.arrayContaining([
          {
            id: 3,
            fullName: "Client 3",
            email: "client-3@test.com",
            imageUrl: "https://example.com/client-3.jpg",
          },
        ]),
      );
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await searchClients({
        page: 99,
        pageSize: 10,
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
