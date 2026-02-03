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
import { updateProjectStatuses } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { ProjectStatus } from "@/generated/prisma/enums";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateProjectStatuses", () => {
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

  it("should update multiple project statuses", async () => {
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
        {
          id: 3,
          title: "Project 3",
          deadline: new Date(),
          categoryId: 2,
          workspaceId: 2,
          status: ProjectStatus.active,
        },
      ],
    });

    const projectIds = [1, 2];
    const nextStatus = ProjectStatus.completed;

    const updatedProjects = await updateProjectStatuses(projectIds, nextStatus);

    expect(updatedProjects.length).toBe(2);
    expect(updatedProjects).toEqual([
      expect.objectContaining({ id: 1, status: nextStatus }),
      expect.objectContaining({ id: 2, status: nextStatus }),
    ]);
  });

  it("should return empty array when attempting to update projects from a different workspace", async () => {
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

    const projectIds = [2];

    const result = await updateProjectStatuses(projectIds, "completed");

    expect(result.length).toBe(0);
  });

  describe("RBAC: update project statuses", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, role, workspaceId: 1 },
      });

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
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");

      const updatedProjects = await updateProjectStatuses([1, 2], "completed");

      expect(updatedProjects.length).toBe(2);
      expect(updatedProjects![0].status).toBe("completed");
    });

    it("should succeed for assignee user", async () => {
      await setup("user-2", "user");

      const updatedProjects = await updateProjectStatuses([1, 2], "completed");

      expect(updatedProjects.length).toBe(2);
      expect(updatedProjects![0].status).toBe("completed");
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");

      await expect(updateProjectStatuses([1, 2], "completed")).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
