import "server-only";

import {
  mapToProjectCategoryDTO,
  CreateProjectCategoryInputDTO,
  UpdateProjectCategoryInputDTO,
} from "./projectCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { validateProjectCategoryLimit } from "../utils/validation";

export const getProjectCategoryCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.projectCategory.count({ where: { workspaceId } });
});

export const getProjectCategories = cache(async () => {
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

  return projectCategories.map(mapToProjectCategoryDTO);
});

export const createProjectCategories = async (
  input: CreateProjectCategoryInputDTO[],
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
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
  const projectCategories = await prisma.projectCategory.createManyAndReturn({
    data: input.map((category) => ({
      name: category.name,
      workspaceId,
    })),
  });

  return projectCategories.map(mapToProjectCategoryDTO);
};

export const updateProjectCategory = async (
  input: UpdateProjectCategoryInputDTO,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
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

  return mapToProjectCategoryDTO(updatedProjectCategory);
};

export const deleteProjectCategories = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
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
  const result = await prisma.projectCategory.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return result;
};
