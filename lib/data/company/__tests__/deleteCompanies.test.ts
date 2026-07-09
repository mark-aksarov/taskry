import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { deleteCompanies } from "../company.dal";
import { AccessDeniedError } from "../../utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/seed/test-data";

describe("deleteCompanies", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
    });
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
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Company 2",
          workspaceId: 1,
        },
      ],
    });

    const result = await deleteCompanies([1, 2]);

    expect(result.count).toBe(2);
  });

  it("should not delete companies from a different workspace", async () => {
    await prisma.company.createMany({
      data: [
        {
          id: 1,
          name: "Company 1",
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteCompanies([1]);
    expect(result.count).toBe(0);
  });

  it("should only delete companies belonging to the current workspace", async () => {
    await prisma.company.createMany({
      data: [
        {
          id: 1,
          name: "Company 1",
          workspaceId: 1,
        },
        {
          id: 4,
          name: "Company 4",
          workspaceId: 2,
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.company.create({
        data: {
          id: 1,
          name: "Company 1",
          workspaceId: 1,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteCompanies([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteCompanies([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteCompanies([3])).rejects.toThrow(AccessDeniedError);
    });
  });
});
