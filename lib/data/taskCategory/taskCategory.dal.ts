import "server-only";

import {
  TaskCategoryDTO,
  TaskCategoryCsvDTO,
  mapToTaskCategoryDTO,
  CreateTaskCategoryInputDTO,
  UpdateTaskCategoryInputDTO,
} from "./taskCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { validateTaskCategoryLimit } from "../utils/validation";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";
import { TaskCategorySelect } from "@/generated/prisma/models/TaskCategory";

export const getTaskCategoryCount = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  return prisma.taskCategory.count({ where: { organizationId } });
});

export const getTaskCategories = cache(async (): Promise<TaskCategoryDTO[]> => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Get task categories
  return await getTaskCategoriesQuery(organizationId, {
    id: true,
    name: true,
  });
});

export const exportTaskCategories = cache(
  async (): Promise<TaskCategoryCsvDTO[]> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    // Get task categories
    return await getTaskCategoriesQuery(organizationId, {
      name: true,
    });
  },
);

export const createTaskCategories = async (
  input: CreateTaskCategoryInputDTO[],
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
        taskCategory: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create task categories.",
    );
  }

  // Validate limit
  await validateTaskCategoryLimit(organizationId, input.length);

  // Create task categories
  const taskCategories = await prisma.taskCategory.createManyAndReturn({
    data: input.map((category) => ({
      name: category.name,
      organizationId,
    })),
  });

  return taskCategories.map(mapToTaskCategoryDTO);
};

export const updateTaskCategory = async (input: UpdateTaskCategoryInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        taskCategory: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update task categories.",
    );
  }

  // Update task category
  const updatedTaskCategory = await prisma.taskCategory.update({
    where: {
      id: input.id,
      organizationId,
    },
    data: {
      name: input.name,
    },
  });

  return mapToTaskCategoryDTO(updatedTaskCategory);
};

export const deleteTaskCategories = async (ids: number[]) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        taskCategory: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete task categories.",
    );
  }

  // Bulk delete task categories within the workspace
  const result = await prisma.taskCategory.deleteMany({
    where: {
      organizationId,
      id: { in: ids },
    },
  });

  return result;
};

/**
 * HELPERS
 */

async function getTaskCategoriesQuery<T extends TaskCategorySelect>(
  organizationId: string,
  select: T,
) {
  return prisma.taskCategory.findMany({
    where: { organizationId },
    select,
    orderBy: {
      createdAt: "desc",
    },
  });
}
