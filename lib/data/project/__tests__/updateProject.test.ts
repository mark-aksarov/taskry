import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updateProject } from "../project.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { ProjectStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateProject", () => {
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

  it("should update project data", async () => {
    const deadlineIso = "2025-12-31";

    const projectData = {
      id: 1,
      description: null,
      title: "Project 1",
      categoryId: 1,
      status: ProjectStatus.active,
      clientId: null,
    };

    await prisma.project.create({
      data: {
        ...projectData,
        deadline: new Date(deadlineIso),
        organizationId: "org-1",
      },
    });

    const result = await updateProject({
      ...projectData,
      deadline: deadlineIso,
      title: "Updated Project Title",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.title).toBe("Updated Project Title");
  });

  it("should throw error if project category does not found", async () => {
    const deadlineIso = "2025-12-31";

    const projectData = {
      id: 1,
      description: null,
      title: "Project 1",
      categoryId: 1,
      status: ProjectStatus.active,
      clientId: null,
    };

    await prisma.project.create({
      data: {
        ...projectData,
        deadline: new Date(deadlineIso),
        organizationId: "org-1",
      },
    });

    const updateProjectPromise = updateProject({
      ...projectData,
      deadline: deadlineIso,
      categoryId: 999,
    });

    await expect(updateProjectPromise).rejects.toThrow(NotFoundError);
    await expect(updateProjectPromise).rejects.toThrow(
      /Project category not found/i,
    );
  });

  it("should throw error if client does not found", async () => {
    const deadlineIso = "2025-12-31";

    const projectData = {
      id: 1,
      description: null,
      title: "Project 1",
      categoryId: 1,
      status: ProjectStatus.active,
      clientId: null,
    };

    await prisma.project.create({
      data: {
        ...projectData,
        deadline: new Date(deadlineIso),
        organizationId: "org-1",
      },
    });

    const updateProjectPromise = updateProject({
      ...projectData,
      deadline: deadlineIso,
      clientId: 999,
    });

    await expect(updateProjectPromise).rejects.toThrow(NotFoundError);
    await expect(updateProjectPromise).rejects.toThrow(/Client not found/i);
  });

  it("should throw error if category does not belong to the organization", async () => {
    const deadlineIso = "2025-12-31";

    const projectData = {
      id: 1,
      description: null,
      title: "Project 1",
      categoryId: 1,
      status: ProjectStatus.active,
      clientId: null,
    };

    await prisma.project.create({
      data: {
        ...projectData,
        deadline: new Date(deadlineIso),
        organizationId: "org-1",
      },
    });

    const updateProjectPromise = updateProject({
      ...projectData,
      deadline: deadlineIso,
      categoryId: 2,
    });

    await expect(updateProjectPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateProjectPromise).rejects.toThrow(
      /Project category access denied/i,
    );
  });

  it("should throw error if client does not belong to the organization", async () => {
    const deadlineIso = "2025-12-31";

    const projectData = {
      id: 1,
      description: null,
      title: "Project 1",
      categoryId: 1,
      status: ProjectStatus.active,
      clientId: null,
    };

    await prisma.project.create({
      data: {
        ...projectData,
        deadline: new Date(deadlineIso),
        organizationId: "org-1",
      },
    });

    const updateProjectPromise = updateProject({
      ...projectData,
      deadline: deadlineIso,
      clientId: 3,
    });

    await expect(updateProjectPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateProjectPromise).rejects.toThrow(/Client access denied/i);
  });

  it("should throw an error when trying to update a project from another organization", async () => {
    const deadlineIso = "2025-12-31";

    const projectData = {
      id: 1,
      description: null,
      title: "Project 1",
      deadline: "2025-12-31",
      categoryId: 2,
      status: ProjectStatus.active,
      clientId: null,
    };

    await prisma.project.create({
      data: {
        ...projectData,
        deadline: new Date(deadlineIso),
        organizationId: "org-2",
      },
    });

    const updateProjectPromise = updateProject({
      ...projectData,
      deadline: deadlineIso,
      title: "Updated Project Title",
      categoryId: null,
    });

    await expect(updateProjectPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateProjectPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update project", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);
      const deadlineIso = "2025-12-31";

      const projectData = {
        id: 1,
        description: null,
        title: "Project 1",
        categoryId: 1,
        status: ProjectStatus.active,
        clientId: null,
      };

      await prisma.project.create({
        data: {
          ...projectData,
          deadline: new Date(deadlineIso),
          organizationId: "org-1",
        },
      });

      return {
        updateInput: {
          ...projectData,
          deadline: deadlineIso,
          title: "Updated Project Title",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1");
      const result = await updateProject(updateInput);
      expect(result).toBeDefined();
      expect(result!.title).toBe(updateInput.title);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateProject(updateInput);
      expect(result).toBeDefined();
      expect(result!.title).toBe(updateInput.title);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updateProject(updateInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
