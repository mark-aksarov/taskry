import {
  seedUsers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedCustomers,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { deleteProjects } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { ProjectStatus } from "@/generated/prisma/enums";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("deleteCustomers", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedProjectCategories();
    await seedTaskCategories();
    await seedCompanies();
    await seedCustomers();
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
          workspaceId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
      ],
    });

    const result = await deleteProjects([1, 2]);

    expect(result.count).toBe(2);
    const remainingTasks = await prisma.project.findMany();

    expect(remainingTasks).toHaveLength(0);
  });

  it("should not delete projects from a different workspace", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 2,
          workspaceId: 2,
          status: ProjectStatus.active,
        },
      ],
    });

    const result = await deleteProjects([1]);

    expect(result.count).toBe(0);
  });

  it("should only delete projects belonging to the current workspace", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 2,
          workspaceId: 2,
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.project.create({
        data: {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteProjects([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteProjects([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteProjects([1])).rejects.toThrow(AccessDeniedError);
    });
  });
});
