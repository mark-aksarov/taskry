import "server-only";

import {
  TaskCategoryDTO,
  CreateTaskCategoryInputDTO,
  UpdateTaskCategoryInputDTO,
} from "./taskCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError, LimitExceededError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { TASK_CATEGORY_MAX_COUNT } from "../constants";

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

export const createTaskCategory = async (input: CreateTaskCategoryInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
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
  await validateTaskCategoryLimit(workspaceId);

  // Create task category
  const taskCategory = await prisma.taskCategory.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return taskCategory;
};

export const createTaskCategories = async (
  input: CreateTaskCategoryInputDTO[],
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
  const taskCategories = await prisma.taskCategory.createMany({
    data: input.map((category) => ({
      name: category.name,
      workspaceId,
    })),
  });

  return taskCategories;
};

export const updateTaskCategory = async (input: UpdateTaskCategoryInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
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

  return updatedTaskCategory;
};

export const deleteTaskCategories = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
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
  const deletedTaskCategories = await prisma.taskCategory.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return deletedTaskCategories;
};

/**
 * HELPERS
 */

// Validate that task category limit has not been reached
async function validateTaskCategoryLimit(
  workspaceId: number,
  newCategoriesCount = 1,
) {
  const existingCount = await prisma.taskCategory.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newCategoriesCount > TASK_CATEGORY_MAX_COUNT) {
    throw new LimitExceededError(
      `You cannot create more than ${TASK_CATEGORY_MAX_COUNT} task categories.`,
    );
  }
}
