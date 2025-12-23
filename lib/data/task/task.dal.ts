import "server-only";

import {
  TaskFilters,
  TaskDetailDTO,
  TaskSummaryDTO,
  TaskListItemDTO,
  CreateTaskInputDTO,
  UpdateTaskInputDTO,
} from "./task.dto";

import {
  mapTaskDetailToDTO,
  mapTaskSummaryToDTO,
  mapTaskListItemToDTO,
  mapTaskFormDataToDTO,
} from "./task.mapper";

import {
  taskDetailSelect,
  taskSummarySelect,
  taskListItemSelect,
  taskFormDataSelect,
} from "./task.select";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { buildDateWhere } from "../utils/dateWhere";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";
import { ALLOWED_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";
import { Prisma, ProjectStatus, TaskStatus } from "@/generated/prisma/client";

/**
 * READ METHODS
 */

export const getTaskSummary = cache(
  async (id: number): Promise<TaskSummaryDTO> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const data = await prisma.task.findFirst({
      where: { id, workspaceId },
      select: taskSummarySelect,
    });
    if (!data) throw new Error("Task not found");
    return mapTaskSummaryToDTO(data);
  },
);

export const getTaskDetail = cache(
  async (id: number): Promise<TaskDetailDTO> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const data = await prisma.task.findFirst({
      where: { id, workspaceId },
      select: taskDetailSelect,
    });
    if (!data) throw new Error("Task not found");
    return mapTaskDetailToDTO(data);
  },
);

export const getTaskFormData = cache(async (id: number) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const data = await prisma.task.findFirst({
    where: { id, workspaceId },
    select: taskFormDataSelect,
  });

  if (!data) throw new Error("Task not found");

  return mapTaskFormDataToDTO(data);
});

export const getTaskList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page: number;
    pageSize: number;
    sort: string;
    filters?: TaskFilters;
  }): Promise<TaskListItemDTO[]> => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const skip = (page - 1) * pageSize;

    const orderByMapping: Record<string, Prisma.TaskOrderByWithRelationInput> =
      {
        title: { title: "asc" },
        deadline: { deadline: "asc" },
        status: { status: "asc" },
        category: { category: { name: "asc" } },
      };

    const tasks = await prisma.task.findMany({
      where: buildTaskWhereClause(workspaceId, filters),
      orderBy: [orderByMapping[sort] || { title: "asc" }],
      skip,
      take: pageSize,
      select: taskListItemSelect,
    });

    return tasks.map(mapTaskListItemToDTO);
  },
);

export const getTaskCount = cache(async (filters?: TaskFilters) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const where = buildTaskWhereClause(workspaceId, filters);

  return prisma.task.count({ where });
});

/**
 * WRITE METHODS
 */

export const createTask = async (input: CreateTaskInputDTO) => {
  const {
    user: { id: creatorId, workspaceId },
  } = await getSessionOrThrow();

  // Validate all relations in parallel
  await validateTaskRelations(workspaceId, input);

  return prisma.task.create({
    data: {
      ...input,
      creatorId,
      workspaceId,
    },
  });
};

export const updateTask = async (input: UpdateTaskInputDTO) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  await validateTaskRelations(workspaceId, input);

  return prisma.task.update({
    where: { id: input.id, workspaceId },
    data: input,
  });
};

export const updateTaskStatuses = async (
  taskIds: number[],
  nextStatus: TaskStatus,
) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  // Determine which project statuses allow the transition to nextStatus
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

export const deleteTasks = async (ids: number[]) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const { count } = await prisma.task.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  if (count === 0) throw new Error("No tasks deleted or access denied.");

  return count;
};

/**
 * HELPERS
 */

async function validateTaskRelations(
  workspaceId: number,
  input: Partial<CreateTaskInputDTO>,
) {
  const checks = [
    prisma.taskCategory.findFirst({
      where: { id: input.categoryId, workspaceId },
    }),
    prisma.project.findFirst({ where: { id: input.projectId, workspaceId } }),
    input.assigneeId
      ? prisma.user.findFirst({ where: { id: input.assigneeId, workspaceId } })
      : Promise.resolve(true),
  ];

  const [category, project, assignee] = await Promise.all(checks);
  if (!category) throw new Error("Category access denied or not found");
  if (!project) throw new Error("Project access denied or not found");
  if (!assignee) throw new Error("Assignee access denied or not found");
}

export function buildTaskWhereClause(
  workspaceId: number,
  filters?: TaskFilters,
): Prisma.TaskWhereInput {
  if (!filters) return { workspaceId };

  const datesWhere = buildDateWhere({
    quick: filters.deadline as any,
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd,
  });

  return {
    workspaceId,
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.project?.length && { projectId: { in: filters.project } }),
    ...(filters.assignee?.length && { assigneeId: { in: filters.assignee } }),
    ...(datesWhere && { deadline: datesWhere }),
  };
}
