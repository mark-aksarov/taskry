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
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { updateProjectStatuses } from "../project.dal";
import { ProjectStatus } from "@/generated/prisma/enums";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateProjectStatuses", () => {
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

  it("should update multiple project statuses", async () => {
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
        {
          id: 3,
          title: "Project 3",
          deadline: new Date(),
          categoryId: 2,
          organizationId: "org-2",
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

  it("should return empty array when attempting to update projects from a different organization", async () => {
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

    const projectIds = [2];

    const result = await updateProjectStatuses(projectIds, "completed");

    expect(result.length).toBe(0);
  });

  describe("RBAC: update project statuses", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

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
    };

    it("should succeed for owner", async () => {
      await setup("user-1");

      const updatedProjects = await updateProjectStatuses([1, 2], "completed");

      expect(updatedProjects.length).toBe(2);
      expect(updatedProjects![0].status).toBe("completed");
    });

    it("should succeed for assignee user", async () => {
      await setup("user-2");

      const updatedProjects = await updateProjectStatuses([1, 2], "completed");

      expect(updatedProjects.length).toBe(2);
      expect(updatedProjects![0].status).toBe("completed");
    });

    it("should fail for anonymous", async () => {
      await setup();

      await expect(updateProjectStatuses([1, 2], "completed")).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
