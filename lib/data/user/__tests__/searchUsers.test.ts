import prisma from "@/lib/prisma";
import { searchUsers } from "../user.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { seedWorkspaces, seedPositions } from "@/lib/data/utils/test-utils";
import { it, expect, describe, beforeEach, beforeAll, afterEach } from "vitest";

describe("searchUsers", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should return all users with valid UserSearchDTO", async () => {
    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          phoneNumber: "phone 1",
          imageUrl: "https://example.com/user-1.jpg",
          publicLink: "https://example.com/user-1",
          positionId: 1,
          role: "user",
          workspaceId: 1,
        },
      ],
    });

    const result = await searchUsers({
      page: 1,
      pageSize: 10,
    });

    expect(result).toStrictEqual({
      items: [
        {
          id: "user-1",
          fullName: "User 1",
          imageUrl: "https://example.com/user-1.jpg",
          email: "user-1@test.com",
        },
      ],
      totalCount: 1,
    });
  });

  it("should filter users by query", async () => {
    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          phoneNumber: "phone 1",
          imageUrl: "https://example.com/user-1.jpg",
          publicLink: "https://example.com/user-1",
          positionId: 1,
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          phoneNumber: "phone 2",
          imageUrl: "https://example.com/user-2.jpg",
          publicLink: "https://example.com/user-2",
          positionId: 1,
          role: "user",
          workspaceId: 1,
        },
      ],
    });

    const result = await searchUsers({
      page: 1,
      pageSize: 10,
      query: "User 1",
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].fullName).toBe("User 1");
  });

  describe("pagination", () => {
    beforeEach(async () => {
      await prisma.user.createMany({
        data: [
          {
            id: "user-1",
            fullName: "User 1",
            email: "user-1@test.com",
            phoneNumber: "phone 1",
            imageUrl: "https://example.com/user-1.jpg",
            publicLink: "https://example.com/user-1",
            positionId: 1,
            role: "user",
            workspaceId: 1,
          },
          {
            id: "user-2",
            fullName: "User 2",
            email: "user-2@test.com",
            phoneNumber: "phone 2",
            imageUrl: "https://example.com/user-2.jpg",
            publicLink: "https://example.com/user-2",
            positionId: 1,
            role: "user",
            workspaceId: 1,
          },
          {
            id: "user-3",
            fullName: "User 3",
            email: "user-3@test.com",
            phoneNumber: "phone 3",
            imageUrl: "https://example.com/user-3.jpg",
            publicLink: "https://example.com/user-3",
            positionId: 1,
            role: "user",
            workspaceId: 1,
          },
        ],
      });
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await searchUsers({
        page: 1,
        pageSize: 2,
      });

      const page2 = await searchUsers({
        page: 2,
        pageSize: 2,
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].fullName).toBe("User 1");
      expect(page1.items[1].fullName).toBe("User 2");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].fullName).toBe("User 3");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await searchUsers({
        page: 99,
        pageSize: 10,
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
