import "server-only";

import {
  mapTaskDetailToDTO,
  mapTaskSummaryToDTO,
  mapTaskListItemToDTO,
  mapTaskCategorySummaryToDTO,
} from "../mappers/task";

import { cache } from "react";
import prisma from "../prisma";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { ALLOWED_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";

export const getTaskSummary = cache(async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const taskSummary = await prisma.task.findFirst({
    where: { id, workspaceId },
    select: {
      id: true,
      title: true,
    },
  });

  if (!taskSummary) throw new Error("Not Found");

  return mapTaskSummaryToDTO(taskSummary);
});

export const getTaskDetail = cache(async (id: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const taskDetail = await prisma.task.findFirst({
    where: { id, workspaceId },
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
      status: true,
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

  if (!taskDetail) throw new Error("Not Found");

  return mapTaskDetailToDTO(taskDetail);
});

export const getTaskList = cache(
  async ({
    assigneeId,
    page,
    pageSize,
    sort,
  }: {
    assigneeId?: string;
    page: number;
    pageSize: number;
    sort: string;
  }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;
    const skip = (page - 1) * pageSize;

    const orderByMapping: Record<string, any> = {
      title: { title: "asc" },
      deadline: { deadline: "asc" },
      status: { status: "asc" },
      category: { category: { name: "asc" } },
    };

    const orderBy = orderByMapping[sort] || { title: "asc" };

    const tasks = await prisma.task.findMany({
      where: {
        workspaceId,
        assigneeId,
      },
      skip,
      take: pageSize,
      orderBy: [orderBy],
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
        status: true,
        project: {
          select: {
            id: true,
            title: true,
            status: true,
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

    return tasks.map(mapTaskListItemToDTO);
  },
);

export const getTaskCategorySummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const categories = await prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return categories.map(mapTaskCategorySummaryToDTO);
});

export const getTaskCount = cache(async (assigneeId?: string) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return prisma.task.count({
    where: {
      workspaceId,
      assigneeId,
    },
  });
});

export const deleteTasks = async (ids: number[]) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const { count } = await prisma.task.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  if (count === 0) throw new Error("No tasks deleted.");

  return count;
};

export const updateTaskStatuses = async (
  taskIds: number[],
  nextStatus: TaskStatus,
) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const allowedProjectStatuses = (
    Object.keys(ALLOWED_TASK_STATUSES_BY_PROJECT) as ProjectStatus[]
  ).filter((ps) => ALLOWED_TASK_STATUSES_BY_PROJECT[ps].includes(nextStatus));

  const { count } = await prisma.task.updateMany({
    where: {
      id: { in: taskIds },
      workspaceId,
      project: {
        status: { in: allowedProjectStatuses },
      },
    },
    data: {
      status: nextStatus,
    },
  });

  return count;
};
