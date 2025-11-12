import "server-only";

import prisma from "../prisma";
import { cache } from "react";
import { ThenArg } from "./types";
import { TaskItem } from "@/components/tasks/types";

export type GetTaskDetailType = ThenArg<ReturnType<typeof getTaskDetail>>;
export const getTaskDetail = cache(async (id: number) => {
  return await prisma.task.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,

      creator: {
        select: {
          id: true,
          fullName: true,
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
          id: true,
          name: true,
          isDone: true,
        },
      },
      attachments: {
        select: {
          id: true,
          fileUrl: true,
          fileName: true,
        },
      },
    },
  });
});

export type GetTasksType = ThenArg<ReturnType<typeof getTasks>>;
export const getTasks = cache(
  async (creatorId?: string): Promise<TaskItem[]> => {
    return await prisma.task.findMany({
      where: creatorId
        ? {
            creatorId,
          }
        : undefined,
      select: {
        id: true,
        title: true,
        deadline: true,

        creator: {
          select: {
            id: true,
            fullName: true,
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
        _count: {
          select: {
            comments: true,
            subtasks: true,
          },
        },
      },
    });
  },
);

export const getTaskCategories = cache(async (workspaceId: number) => {
  return prisma.taskCategory.findMany({
    where: { workspaceId },
  });
});

export const getTotalTasks = cache(async () => {
  return prisma.task.count();
});
