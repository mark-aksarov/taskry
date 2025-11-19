import "server-only";

import prisma from "../prisma";
import { cache } from "react";
import { ThenArg } from "./types";

export type GetTaskDetailType = ThenArg<ReturnType<typeof getTaskDetail>>;
export const getTaskDetail = cache(async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await prisma.task.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,

      assignee: {
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
          text: true,
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
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
});

export type GetTasksType = ThenArg<ReturnType<typeof getTasks>>;
export const getTasks = cache(async (creatorId?: string) => {
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

      assignee: {
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
});
