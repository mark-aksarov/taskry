import "server-only";

import prisma from "../prisma";
import { cache } from "react";
import { ThenArg } from "./types";

export type GetTaskDetailType = ThenArg<ReturnType<typeof getTaskDetail>>;
export const getTaskDetail = cache(async (id: number) => {
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
          name: true,
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

export type GetTaskSummaryType = ThenArg<ReturnType<typeof getTaskSummary>>;
export const getTaskSummary = cache(async (id: number) => {
  return await prisma.task.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  });
});

function getTaskWhereClause(params: {
  workspaceId: number;
  assigneeId?: string;
}) {
  const { workspaceId, assigneeId } = params;

  return {
    category: {
      workspaceId,
    },
    ...(assigneeId && { assigneeId }),
  };
}

export type GetTaskListType = ThenArg<ReturnType<typeof getTaskList>>;
export const getTaskList = cache(
  async ({
    workspaceId,
    assigneeId,
    page,
    pageSize,
  }: {
    workspaceId: number;
    assigneeId?: string;
    page: number;
    pageSize: number;
  }) => {
    const where = getTaskWhereClause({ workspaceId, assigneeId });

    const skip = (page - 1) * pageSize;

    return prisma.task.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        deadline: "asc",
      },
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
            name: true,
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

export const getTaskCount = cache(
  async ({
    workspaceId,
    assigneeId,
  }: {
    workspaceId: number;
    assigneeId?: string;
  }) => {
    const where = getTaskWhereClause({ workspaceId, assigneeId });

    return prisma.task.count({ where });
  },
);

export type GetTaskCategorySummariesType = ThenArg<
  ReturnType<typeof getTaskCategorySummaries>
>;
export const getTaskCategorySummaries = cache(async (workspaceId: number) => {
  return prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export type GetTaskStatusSummariesType = ThenArg<
  ReturnType<typeof getTaskStatusSummaries>
>;
export const getTaskStatusSummaries = cache(async () => {
  return prisma.taskStatus.findMany({
    select: { id: true, name: true },
  });
});
