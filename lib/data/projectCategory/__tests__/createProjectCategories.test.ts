import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { it, expect, describe, beforeAll } from "vitest";
import { PROJECT_CATEGORY_MAX_COUNT } from "../../constants";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { createProjectCategories } from "../projectCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { AccessDeniedError, LimitExceededError } from "../../utils/error";

describe("createProjectCategories", () => {
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

  it("should successfully create projectCategories", async () => {
    const input = [
      {
        id: 1,
        name: "Project Category 1",
      },
      {
        id: 2,
        name: "Project Category 2",
      },
    ];

    const result = await createProjectCategories(input);

    expect(result.length).toBe(2);
    expect(result).toMatchObject([
      {
        name: "Project Category 1",
      },
      {
        name: "Project Category 2",
      },
    ]);
  });

  it("should fail when creating project categories exceeds the limit", async () => {
    const categories = [];

    for (let i = 1; i < PROJECT_CATEGORY_MAX_COUNT; i++) {
      categories.push({
        workspaceId: 1,
        name: `Project Category ${i}`,
      });
    }

    await prisma.projectCategory.createMany({
      data: categories,
    });

    await expect(
      createProjectCategories([
        {
          name: "Project Category 1",
        },
        {
          name: "Project Category 2",
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.projectCategory.deleteMany();
  });

  describe("RBAC: create project categories", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = [
        {
          id: 1,
          name: "Project Category 1",
        },
        {
          id: 2,
          name: "Project Category 2",
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");

      const result = await createProjectCategories(createInput);

      expect(result.length).toBe(2);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createProjectCategories(createInput);

      expect(result.length).toBe(2);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createProjectCategories(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
