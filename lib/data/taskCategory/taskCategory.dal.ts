import "server-only";

import {
  TaskCategorySummaryDTO,
  CreateTaskCategoryInputDTO,
  UpdateTaskCategoryInputDTO,
} from "./taskCategory.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";

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

  // Update project category
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
