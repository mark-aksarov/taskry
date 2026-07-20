import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { it, expect, describe, beforeAll } from "vitest";
import { PROJECT_CATEGORY_MAX_COUNT } from "../../constants";
import { createProjectCategory } from "../projectCategory.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { AccessDeniedError, LimitExceededError } from "../../utils/error";

describe("createProjectCategory", () => {
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

  it("should successfully create a projectCategory", async () => {
    const input = {
      id: 1,
      name: "Project Category 1",
    };

    const result = await createProjectCategory(input);

    expect(result).toBeDefined();
    expect(result.name).toBe("Project Category 1");
    expect(result.workspaceId).toBe(1);
  });

  it("should fail when project category limit is reached", async () => {
    const categories = [];

    for (let i = 1; i <= PROJECT_CATEGORY_MAX_COUNT; i++) {
      categories.push({
        workspaceId: 1,
        name: `Project Category ${i}`,
      });
    }

    await prisma.projectCategory.createMany({
      data: categories,
    });

    await expect(
      createProjectCategory({
        name: "New Project Category",
      }),
    ).rejects.toThrow(LimitExceededError);

    await prisma.projectCategory.deleteMany();
  });

  describe("RBAC: create project category", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        id: 1,
        name: "Project Category 1",
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createProjectCategory(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createProjectCategory(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createProjectCategory(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
