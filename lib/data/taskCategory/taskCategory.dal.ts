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
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { validateTaskCategoryLimit } from "../utils/validation";

export const getTaskCategoryCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.taskCategory.count({ where: { workspaceId } });
});

export const getTaskCategories = cache(async (): Promise<TaskCategoryDTO[]> => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.taskCategory.findMany({
    where: { workspaceId },
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
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        taskCategory: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create task categories.",
    );
  }

  // Validate limit
  await validateTaskCategoryLimit(workspaceId, input.length);

  // Create task categories
  const taskCategories = await prisma.taskCategory.createManyAndReturn({
    data: input.map((category) => ({
      name: category.name,
      workspaceId,
    })),
  });

  return taskCategories.map(mapToTaskCategoryDTO);
};

export const updateTaskCategory = async (input: UpdateTaskCategoryInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        taskCategory: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update task categories.",
    );
  }

  // Update task category
  const updatedTaskCategory = await prisma.taskCategory.update({
    where: {
      id: input.id,
      workspaceId,
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
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        taskCategory: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete task categories.",
    );
  }

  // Bulk delete task categories within the workspace
  const result = await prisma.taskCategory.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return result;
};
