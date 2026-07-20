import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { AccessDeniedError } from "../../utils/error";
import { it, expect, describe, beforeAll } from "vitest";
import { createProjectCategories } from "../projectCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, workspaces } from "@/prisma/seed/test-data";

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

    expect(result).toBeDefined();
    expect(result.count).toBe(2);

    const projectCategories = await prisma.projectCategory.findMany({
      where: {
        workspaceId: 1,
      },
      orderBy: {
        id: "asc",
      },
    });

    expect(projectCategories).toHaveLength(2);
    expect(projectCategories[0].name).toBe("Project Category 1");
    expect(projectCategories[1].name).toBe("Project Category 2");
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

      expect(result).toBeDefined();
      expect(result.count).toBe(2);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createProjectCategories(createInput);

      expect(result).toBeDefined();
      expect(result.count).toBe(2);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createProjectCategories(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
