import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { createTaskCategories } from "../taskCategory.dal";
import { PROJECT_CATEGORY_MAX_COUNT } from "../../constants";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, organizations } from "@/prisma/seed/test-data";
import { LimitExceededError, UnauthorizedError } from "../../utils/error";

describe("createTaskCategories", () => {
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

  it("should successfully create taskCategories", async () => {
    const input = [
      {
        id: 1,
        name: "Task Category 1",
      },
      {
        id: 2,
        name: "Task Category 2",
      },
    ];

    const result = await createTaskCategories(input);

    expect(result).toBeDefined();
    expect(result).toMatchObject([
      {
        name: "Task Category 1",
      },
      {
        name: "Task Category 2",
      },
    ]);
  });

  it("should fail when creating task categories exceeds the limit", async () => {
    const categories = [];

    for (let i = 1; i < PROJECT_CATEGORY_MAX_COUNT; i++) {
      categories.push({
        organizationId: "org-1",
        name: `Task Category ${i}`,
      });
    }

    await prisma.taskCategory.createMany({
      data: categories,
    });

    await expect(
      createTaskCategories([
        {
          name: "Task Category 1",
        },
        {
          name: "Task Category 2",
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.taskCategory.deleteMany();
  });

  describe("RBAC: create task categories", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      const createInput = [
        {
          id: 1,
          name: "Task Category 1",
        },
        {
          id: 2,
          name: "Task Category 2",
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1");

      const result = await createTaskCategories(createInput);

      expect(result.length).toBe(2);
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");

      const result = await createTaskCategories(createInput);

      expect(result.length).toBe(2);
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();

      await expect(createTaskCategories(createInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
