import "server-only";

import {
  ProjectCategoryDTO,
  ProjectCategoryCsvDTO,
  CreateProjectCategoryInputDTO,
  UpdateProjectCategoryInputDTO,
} from "./projectCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { ProjectCategory } from "@/generated/prisma/client";
import { validateProjectCategoryLimit } from "../utils/validation";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";

export const getProjectCategoryCount = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  return prisma.projectCategory.count({ where: { organizationId } });
});

export const getProjectCategories = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Get project categories
  const projectCategories = await prisma.projectCategory.findMany({
    where: { organizationId },
    select: { id: true, name: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projectCategories.map(mapToProjectCategoryDTO);
});

export const exportProjectCategories = cache(
  async (): Promise<ProjectCategoryCsvDTO[]> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    // Get project categories
    const projectCategories = await prisma.projectCategory.findMany({
      where: { organizationId },
      select: { name: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projectCategories.map((pc) => ({ name: pc.name }));
  },
);

export const createProjectCategories = async (
  input: CreateProjectCategoryInputDTO[],
) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        projectCategory: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create project categories.",
    );
  }

  // Validate limit
  await validateProjectCategoryLimit(organizationId, input.length);

  // Create project categories
  const projectCategories = await prisma.projectCategory.createManyAndReturn({
    data: input.map((category) => ({
      name: category.name,
      organizationId,
    })),
  });

  return projectCategories.map(mapToProjectCategoryDTO);
};

export const updateProjectCategory = async (
  input: UpdateProjectCategoryInputDTO,
) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        projectCategory: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project categories.",
    );
  }

  // Update project category
  const updatedProjectCategory = await prisma.projectCategory.update({
    where: {
      id: input.id,
      organizationId,
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        projectCategory: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete project categories.",
    );
  }

  // Bulk delete project categories within the workspace
  const result = await prisma.projectCategory.deleteMany({
    where: {
      organizationId,
      id: { in: ids },
    },
  });

  return result;
};

/**
 * Helper
 */

function mapToProjectCategoryDTO(
  projectCategory: Pick<ProjectCategory, "id" | "name">,
): ProjectCategoryDTO {
  return {
    id: projectCategory.id,
    name: projectCategory.name,
  };
}
