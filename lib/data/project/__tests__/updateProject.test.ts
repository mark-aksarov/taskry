import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { updateProject } from "../project.dal";
import { seed } from "@/prisma/test-utils/seed";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { AccessDeniedError, NotFoundError } from "../../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateProject", () => {
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

  afterEach(async () => {
    await prisma.project.deleteMany();
  });

  it("should update project data", async () => {
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

    const result = await updateProject({
      id: 1,
      title: "Updated Project Title",
      status: ProjectStatus.active,
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.title).toBe("Updated Project Title");
  });

  it("should throw error if project category does not found", async () => {
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

    const updateProjectPromise = updateProject({
      id: 1,
      categoryId: 999,
    });

    await expect(updateProjectPromise).rejects.toThrow(NotFoundError);
    await expect(updateProjectPromise).rejects.toThrow(
      /Project category not found/i,
    );
  });

  it("should throw error if customer does not found", async () => {
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

    const updateProjectPromise = updateProject({
      id: 1,
      customerId: 999,
    });

    await expect(updateProjectPromise).rejects.toThrow(NotFoundError);
    await expect(updateProjectPromise).rejects.toThrow(/Customer not found/i);
  });

  it("should throw error if category does not belong to the workspace", async () => {
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

    const updateProjectPromise = updateProject({
      id: 1,
      categoryId: 2,
    });

    await expect(updateProjectPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateProjectPromise).rejects.toThrow(
      /Project category access denied/i,
    );
  });

  it("should throw error if customer does not belong to the workspace", async () => {
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

    const updateProjectPromise = updateProject({
      id: 1,
      customerId: 3,
    });

    await expect(updateProjectPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateProjectPromise).rejects.toThrow(
      /Customer access denied/i,
    );
  });

  it("should throw an error when trying to update a project from another workspace", async () => {
    await prisma.project.create({
      data: {
        id: 1,
        title: "Project 1",
        deadline: new Date(),
        categoryId: 1,
        workspaceId: 2,
        status: ProjectStatus.active,
      },
    });

    const updateProjectPromise = updateProject({
      id: 1,
      title: "Updated Project Title",
    });

    await expect(updateProjectPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateProjectPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update project", () => {
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

      return {
        updateInput: {
          id: 1,
          title: "Updated Project Title",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateProject(updateInput);
      expect(result.title).toBe(updateInput.title);
    });

    it("should fail for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateProject(updateInput);
      expect(result.title).toBe(updateInput.title);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateProject(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
