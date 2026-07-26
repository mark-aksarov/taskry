import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { deleteProjects } from "../project.dal";
import { members } from "@/prisma/seed/test-data";
import { setupAuth } from "@/lib/test-utils/auth";
import { ProjectStatus } from "@/generated/prisma/enums";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("deleteClients", () => {
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

  afterEach(async () => {
    await prisma.project.deleteMany();
  });

  it("should successfully delete projects", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          organizationId: "org-1",
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 1,
          organizationId: "org-1",
          status: ProjectStatus.active,
        },
      ],
    });

    const result = await deleteProjects([1, 2]);

    expect(result.count).toBe(2);
    const remainingTasks = await prisma.project.findMany();

    expect(remainingTasks).toHaveLength(0);
  });

  it("should not delete projects from a different organization", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 2,
          organizationId: "org-2",
          status: ProjectStatus.active,
        },
      ],
    });

    const result = await deleteProjects([1]);

    expect(result.count).toBe(0);
  });

  it("should only delete projects belonging to the current organization", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          organizationId: "org-1",
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 2,
          organizationId: "org-2",
          status: ProjectStatus.active,
        },
      ],
    });

    const result = await deleteProjects([1, 2]);

    expect(result.count).toBe(1);

    const project = await prisma.project.findUnique({
      where: { id: 2 },
    });
    expect(project).not.toBeNull();
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteProjects([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete projects", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.project.create({
        data: {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          organizationId: "org-1",
          status: ProjectStatus.active,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deleteProjects([1]);
      expect(result.count).toBe(1);
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deleteProjects([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deleteProjects([1])).rejects.toThrow(UnauthorizedError);
    });
  });
});
