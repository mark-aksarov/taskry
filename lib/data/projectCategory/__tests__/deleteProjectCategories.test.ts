import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-utils/seed";
import { AccessDeniedError } from "../../utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/test-utils/data";
import { deleteProjectCategories } from "../projectCategory.dal";

describe("deleteProjectCategories", () => {
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
    await prisma.projectCategory.deleteMany();
  });

  it("should successfully delete project categories", async () => {
    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Project Category 2",
          workspaceId: 1,
        },
      ],
    });

    const result = await deleteProjectCategories([1, 2]);

    expect(result.count).toBe(2);
    const remainingProjectCategories = await prisma.projectCategory.findMany();

    expect(remainingProjectCategories).toHaveLength(0);
  });

  it("should not delete project categories from a different workspace", async () => {
    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteProjectCategories([1]);
    expect(result.count).toBe(0);
  });

  it("should only delete project categories belonging to the current workspace", async () => {
    await prisma.projectCategory.createMany({
      data: [
        {
          id: 1,
          name: "Project Category 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Project Category 2",
          workspaceId: 2,
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.projectCategory.create({
        data: {
          id: 1,
          name: "Project Category 1",
          workspaceId: 1,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteProjectCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteProjectCategories([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteProjectCategories([1])).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
