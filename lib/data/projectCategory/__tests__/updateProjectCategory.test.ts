import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-utils/seed";
import { AccessDeniedError } from "../../utils/error";
import { updateProjectCategory } from "../projectCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/test-utils/data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateProjectCategory", () => {
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

  it("should successfully update a project category", async () => {
    await prisma.projectCategory.create({
      data: {
        id: 1,
        name: "Project Category 1",
        workspaceId: 1,
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

  it("should throw an error when trying to update a project category from another workspace", async () => {
    await prisma.projectCategory.create({
      data: {
        id: 1,
        name: "Project Category 1",
        workspaceId: 2,
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

      return {
        updateInput: {
          id: 1,
          name: "Updated Project Category Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateProjectCategory(updateInput);
      expect(result.name).toBe(updateInput.name);
    });

    it("should fail for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateProjectCategory(updateInput);
      expect(result.name).toBe(updateInput.name);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateProjectCategory(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
