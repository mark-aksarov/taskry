import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { UnauthorizedError } from "../../utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { deleteProjectCategories } from "../projectCategory.dal";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("deleteProjectCategories", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await setupAuth("user-1");
  });

  afterEach(async () => {
    await prisma.projectCategory.deleteMany();
  });

  it("should successfully delete project categories", async () => {
    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          organizationId: "org-1",
        },
        {
          id: 2,
          name: "Project Category 2",
          organizationId: "org-1",
        },
      ],
    });

    const result = await deleteProjectCategories([1, 2]);

    expect(result.count).toBe(2);
    const remainingProjectCategories = await prisma.projectCategory.findMany();

    expect(remainingProjectCategories).toHaveLength(0);
  });

  it("should not delete project categories from a different organization", async () => {
    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          organizationId: "org-2",
        },
      ],
    });

    const result = await deleteProjectCategories([1]);
    expect(result.count).toBe(0);
  });

  it("should only delete project categories belonging to the current organization", async () => {
    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          organizationId: "org-1",
        },
        {
          id: 2,
          name: "Project Category 2",
          organizationId: "org-2",
        },
      ],
    });

    const result = await deleteProjectCategories([1, 2]);
    expect(result.count).toBe(1);
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteProjectCategories([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete project categories", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.projectCategory.create({
        data: {
          id: 1,
          name: "Project Category 1",
          organizationId: "org-1",
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deleteProjectCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deleteProjectCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deleteProjectCategories([1])).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
