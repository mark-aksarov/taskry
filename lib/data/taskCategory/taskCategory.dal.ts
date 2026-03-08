import "server-only";

import {
  TaskCategorySummaryDTO,
  CreateTaskCategoryInputDTO,
  UpdateTaskCategoryInputDTO,
} from "./taskCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { requireSession } from "../utils/requireSession";
import { AccessDeniedError, NotFoundError } from "../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const getTaskCategoryCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.taskCategory.count({ where: { workspaceId } });
});

export const getTaskCategorySummaries = cache(
  async (): Promise<TaskCategorySummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    return await prisma.taskCategory.findMany({
      where: { workspaceId },
      select: { id: true, name: true },
    });
  },
);

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

  // Create task category
  const taskCategory = await prisma.taskCategory.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return taskCategory;
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
  try {
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
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new NotFoundError(
        "Task category not found.",
        "taskCategoryNotFound",
      );
    }
  }
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
