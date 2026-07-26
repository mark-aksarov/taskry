import "server-only";

import {
  TaskCategoryDTO,
  CreateTaskCategoryInputDTO,
  UpdateTaskCategoryInputDTO,
  mapToTaskCategoryDTO,
} from "./taskCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { validateTaskCategoryLimit } from "../utils/validation";
import { verifyResourceAccess } from "../utils/verifyResourceAccess";

export const getTaskCategoryCount = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  return prisma.taskCategory.count({ where: { organizationId } });
});

export const getTaskCategories = cache(async (): Promise<TaskCategoryDTO[]> => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  return await prisma.taskCategory.findMany({
    where: { organizationId },
    select: { id: true, name: true },
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const createTaskCategories = async (
  input: CreateTaskCategoryInputDTO[],
) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

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
  } = await verifyResourceAccess();

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
  } = await verifyResourceAccess();

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
