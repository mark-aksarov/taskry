import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { deleteCompanies } from "../company.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { UnauthorizedError } from "../../utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("deleteCompanies", () => {
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
    await prisma.company.deleteMany();
  });

  it("should successfully delete companies", async () => {
    await prisma.company.createMany({
      data: [
        {
          id: 1,
          name: "Company 1",
          organizationId: "org-1",
        },
        {
          id: 2,
          name: "Company 2",
          organizationId: "org-1",
        },
      ],
    });

    const result = await deleteCompanies([1, 2]);

    expect(result.count).toBe(2);
  });

  it("should not delete companies from a different organization", async () => {
    await prisma.company.createMany({
      data: [
        {
          id: 1,
          name: "Company 1",
          organizationId: "org-2",
        },
      ],
    });

    const result = await deleteCompanies([1]);
    expect(result.count).toBe(0);
  });

  it("should only delete companies belonging to the current organization", async () => {
    await prisma.company.createMany({
      data: [
        {
          id: 1,
          name: "Company 1",
          organizationId: "org-1",
        },
        {
          id: 4,
          name: "Company 4",
          organizationId: "org-2",
        },
      ],
    });

    const result = await deleteCompanies([1, 2]);
    expect(result.count).toBe(1);
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteCompanies([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete companies", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.company.create({
        data: {
          id: 1,
          name: "Company 1",
          organizationId: "org-1",
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deleteCompanies([1]);
      expect(result.count).toBe(1);
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deleteCompanies([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deleteCompanies([3])).rejects.toThrow(UnauthorizedError);
    });
  });
});
