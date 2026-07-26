import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { UnauthorizedError } from "../../utils/error";
import { updateProjectCategory } from "../projectCategory.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateProjectCategory", () => {
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

  it("should successfully update a project category", async () => {
    await prisma.projectCategory.create({
      data: {
        id: 1,
        name: "Project Category 1",
        organizationId: "org-1",
      },
    });

    const result = await updateProjectCategory({
      id: 1,
      name: "Updated Project Category Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.name).toBe("Updated Project Category Name");
  });

  it("should throw an error when trying to update a project category from another organization", async () => {
    await prisma.projectCategory.create({
      data: {
        id: 1,
        name: "Project Category 1",
        organizationId: "org-2",
      },
    });

    const updateProjectCategoryPromise = updateProjectCategory({
      id: 1,
      name: "Updated Project Category Name",
    });

    await expect(updateProjectCategoryPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateProjectCategoryPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update project category", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.projectCategory.create({
        data: {
          id: 1,
          name: "Project Category 1",
          organizationId: "org-1",
        },
      });

      return {
        updateInput: {
          id: 1,
          name: "Updated Project Category Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1");
      const result = await updateProjectCategory(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateProjectCategory(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updateProjectCategory(updateInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
