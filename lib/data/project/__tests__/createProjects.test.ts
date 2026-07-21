import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createProjects } from "../project.dal";
import { PROJECT_MAX_COUNT } from "../../constants";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createProjects", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      customers,
      taskCategories,
      projectCategories,
    });
  });

  it("should successfully create projects", async () => {
    const result = await createProjects([
      {
        title: "Project 1",
        description: "Description 1",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      },
      {
        title: "Project 2",
        description: "Description 2",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      },
    ]);

    expect(result).toHaveLength(2);
    expect(result).toMatchObject([
      {
        title: "Project 1",
        description: "Description 1",
        deadline: new Date("2025-12-31").toISOString(),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      },
      {
        title: "Project 2",
        description: "Description 2",
        deadline: new Date("2025-12-31").toISOString(),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      },
    ]);
  });

  it("should throw error if project category does not found", async () => {
    const createProjectsPromise = createProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        categoryId: 999,
        customerId: 1,
        status: ProjectStatus.active,
      },
    ]);

    await expect(createProjectsPromise).rejects.toThrow(NotFoundError);
    await expect(createProjectsPromise).rejects.toThrow(
      /Project category not found/i,
    );
  });

  it("should throw error if customer does not found", async () => {
    const createProjectsPromise = createProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        categoryId: 1,
        customerId: 999,
        status: ProjectStatus.active,
      },
    ]);

    await expect(createProjectsPromise).rejects.toThrow(NotFoundError);
    await expect(createProjectsPromise).rejects.toThrow(/Customer not found/i);
  });

  it("should throw error if category does not belong to the workspace", async () => {
    const createProjectsPromise = createProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        categoryId: 2,
        customerId: 1,
        status: ProjectStatus.active,
      },
    ]);

    await expect(createProjectsPromise).rejects.toThrow(AccessDeniedError);
    await expect(createProjectsPromise).rejects.toThrow(
      /Project category access denied/i,
    );
  });

  it("should throw error if customer does not belong to the workspace", async () => {
    const createProjectsPromise = createProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        categoryId: 1,
        customerId: 3,
        status: ProjectStatus.active,
      },
    ]);

    await expect(createProjectsPromise).rejects.toThrow(AccessDeniedError);
    await expect(createProjectsPromise).rejects.toThrow(
      /Customer access denied/i,
    );
  });

  it("should create projects without optional fields", async () => {
    const result = await createProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        categoryId: 1,
        status: ProjectStatus.active,
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBeDefined();
    expect(result[0].customerId).toBeUndefined();
  });

  it("should fail when creating projects exceeds the limit", async () => {
    for (let i = 1; i < PROJECT_MAX_COUNT; i++) {
      await prisma.project.create({
        data: {
          title: `Project ${i}`,
          deadline: new Date("2025-12-31"),
          status: ProjectStatus.active,
          workspaceId: 1,
          creatorId: "user-1",
          categoryId: 1,
        },
      });
    }

    await expect(
      createProjects([
        {
          title: "Project 1",
          deadline: "2025-12-31",
          status: ProjectStatus.active,
          categoryId: 1,
          customerId: 1,
        },
        {
          title: "Project 2",
          deadline: "2025-12-31",
          status: ProjectStatus.active,
          categoryId: 1,
          customerId: 1,
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.project.deleteMany();
  });

  describe("RBAC: create projects", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = [
        {
          title: "Project 1",
          deadline: "2025-12-31",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.active,
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");

      const result = await createProjects(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(createInput[0].title);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createProjects(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(createInput[0].title);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createProjects(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
