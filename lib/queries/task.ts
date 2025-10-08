import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { TaskPreview } from "./types";
import { ACTIVE_TASK_STATUS_ID, DONE_TASK_STATUS_ID } from "./constants";

export const getTask = cache(async (id: number) => {
  return await prisma.task.findUnique({
    where: { id },
  });
});

export const getTasks = cache(async (): Promise<TaskPreview[]> => {
  return await prisma.task.findMany({
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      status: {
        select: {
          id: true,
          nameEn: true,
          nameRu: true,
        },
      },
      project: {
        select: {
          id: true,
          title: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      subtasks: {
        select: {
          isDone: true,
        },
      },
    },
    take: 10,
  });
});

export const getTaskCategories = cache(async (workspaceId: number) => {
  return prisma.taskCategory.findMany({
    where: { workspaceId },
  });
});

export const getTotalTasks = cache(async (fromDate?: Date, toDate?: Date) => {
  const where: any = {};

  if (fromDate && toDate) {
    where.deadline = {
      gte: fromDate,
      lte: toDate,
    };
  }

  return prisma.task.count({ where });
});

export const getActiveTasks = cache(async () => {
  return prisma.task.count({
    where: { statusId: ACTIVE_TASK_STATUS_ID },
  });
});

export const getTasksDone = cache(async () => {
  return prisma.task.count({
    where: { statusId: DONE_TASK_STATUS_ID },
  });
});
