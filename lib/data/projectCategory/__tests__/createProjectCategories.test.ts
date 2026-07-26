import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { PROJECT_CATEGORY_MAX_COUNT } from "../../constants";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { createProjectCategories } from "../projectCategory.dal";
import { UnauthorizedError, LimitExceededError } from "../../utils/error";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("createProjectCategories", () => {
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
        organizationId: "org-1",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

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
      const { createInput } = await setup("user-1");

      const result = await createProjectCategories(createInput);

      expect(result.length).toBe(2);
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");

      const result = await createProjectCategories(createInput);

      expect(result.length).toBe(2);
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();

      await expect(createProjectCategories(createInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
