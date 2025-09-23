import { cache } from "react";
import prisma from "../prisma";
import { TaskCommentPreview, TaskPreview } from "./types";
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
      category: {
        select: {
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

export const getUnreadTaskComments = cache(
  async (userId: string): Promise<TaskCommentPreview[]> => {
    const unreadComments = await prisma.taskComment.findMany({
      where: {
        // Only comments that the user has NOT read
        NOT: {
          reads: {
            some: {
              userId,
            },
          },
        },
      },
      include: {
        sender: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
        task: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return unreadComments;
  },
);
