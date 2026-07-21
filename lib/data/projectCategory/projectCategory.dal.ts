import "server-only";

import {
  ProjectCategoryDTO,
  CreateProjectCategoryInputDTO,
  UpdateProjectCategoryInputDTO,
} from "./projectCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { requireSession } from "../utils/requireSession";
import { PROJECT_CATEGORY_MAX_COUNT } from "../constants";
import { AccessDeniedError, LimitExceededError } from "../utils/error";

export const getProjectCategoryCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.projectCategory.count({ where: { workspaceId } });
});

export const getProjectCategories = cache(
  async (): Promise<ProjectCategoryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get project categories
    const projectCategories = await prisma.projectCategory.findMany({
      where: { workspaceId },
      select: { id: true, name: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projectCategories.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
  },
);

export const createProjectCategory = async (
  input: CreateProjectCategoryInputDTO,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        projectCategory: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create project categories.",
    );
  }

  // Validate limit
  await validateProjectCategoryLimit(workspaceId);

  // Create project category
  const projectCategory = await prisma.projectCategory.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return projectCategory;
};

export const createProjectCategories = async (
  input: CreateProjectCategoryInputDTO[],
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        projectCategory: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create project categories.",
    );
  }

  // Validate limit
  await validateProjectCategoryLimit(workspaceId, input.length);

  // Create project categories
  const projectCategories = await prisma.projectCategory.createMany({
    data: input.map((category) => ({
      name: category.name,
      workspaceId,
    })),
  });

  return projectCategories;
};

export const updateProjectCategory = async (
  input: UpdateProjectCategoryInputDTO,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        projectCategory: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project categories.",
    );
  }

  // Update project category
  const updatedProjectCategory = await prisma.projectCategory.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      name: input.name,
    },
  });

  return updatedProjectCategory;
};

export const deleteProjectCategories = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        projectCategory: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete project categories.",
    );
  }

  // Bulk delete project categories within the workspace
  const deletedProjectCategories = await prisma.projectCategory.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return deletedProjectCategories;
};

/**
 * HELPERS
 */

// Validate that project category limit has not been reached
async function validateProjectCategoryLimit(
  workspaceId: number,
  newCategoriesCount = 1,
) {
  const existingCount = await prisma.projectCategory.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newCategoriesCount > PROJECT_CATEGORY_MAX_COUNT) {
    throw new LimitExceededError(
      `You cannot create more than ${PROJECT_CATEGORY_MAX_COUNT} project categories.`,
    );
  }
}
