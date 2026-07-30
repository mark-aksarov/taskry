import {
  users,
  clients,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
  members,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  LimitExceededError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";

import { seed } from "@/prisma/test-seed";
import { importProjects } from "../project.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { PROJECT_MAX_COUNT } from "../../constants";
import { ProjectStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

import { it, expect, describe, beforeAll } from "vitest";

describe("importProjects", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
      taskCategories,
      projectCategories,
    });

    await setupAuth("user-1");
  });

  it("should successfully import projects", async () => {
    const result = await importProjects([
      {
        title: "Project 1",
        description: "Description 1",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
        categoryName: "Project Category 1",
        clientEmail: "client-1@test.com",
      },
      {
        title: "Project 2",
        description: "Description 2",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
        categoryName: "Project Category 1",
        clientEmail: "client-1@test.com",
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
        clientId: 1,
      },
      {
        title: "Project 2",
        description: "Description 2",
        deadline: new Date("2025-12-31").toISOString(),
        status: ProjectStatus.active,
        categoryId: 1,
        clientId: 1,
      },
    ]);
  });

  it("should throw error if project category does not found", async () => {
    const promise = importProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
        categoryName: "Unknown category",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);

    await expect(promise).rejects.toThrow(/Project categories not found/i);
  });

  it("should throw error if client does not found", async () => {
    const promise = importProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
        clientEmail: "unknown@test.com",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);

    await expect(promise).rejects.toThrow(/Clients not found/i);
  });

  it("should create projects without optional fields", async () => {
    const result = await importProjects([
      {
        title: "Project 1",
        deadline: "2025-12-31",
        status: ProjectStatus.active,
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBeDefined();
    expect(result[0].clientId).toBeUndefined();
    expect(result[0].categoryId).toBeUndefined();
  });

  it("should fail when creating projects exceeds the limit", async () => {
    for (let i = 1; i < PROJECT_MAX_COUNT; i++) {
      await prisma.project.create({
        data: {
          title: `Project ${i}`,
          deadline: new Date("2025-12-31"),
          status: ProjectStatus.active,
          organizationId: "org-1",
          creatorId: "user-1",
          categoryId: 1,
        },
      });
    }

    await expect(
      importProjects([
        {
          title: "Project 1",
          deadline: "2025-12-31",
          status: ProjectStatus.active,
        },
        {
          title: "Project 2",
          deadline: "2025-12-31",
          status: ProjectStatus.active,
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.project.deleteMany();
  }, 30000);

  describe("RBAC: import projects", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      return {
        input: [
          {
            title: "Project 1",
            deadline: "2025-12-31",
            categoryName: "Project Category 1",
            clientEmail: "client-1@test.com",
            status: ProjectStatus.active,
          },
        ],
      };
    };

    it("should succeed for owner", async () => {
      const { input } = await setup("user-1");

      const result = await importProjects(input);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(input[0].title);
    });

    it("should succeed for member", async () => {
      const { input } = await setup("user-2");

      const result = await importProjects(input);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(input[0].title);
    });

    it("should fail for anonymous", async () => {
      const { input } = await setup();

      await expect(importProjects(input)).rejects.toThrow(UnauthorizedError);
    });
  });
});
