import {
  canCreateTask,
  canDeleteTask,
  canUpdateTask,
  canUpdateTaskStatus,
} from "../user/user.dal";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TaskFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { buildDateWhere } from "../utils/dateWhere";
import { verifySession } from "../utils/verifySession";
import { UpdateTaskInputDTO, CreateTaskInputDTO } from "./task.dto";
import { ALLOWED_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";
import { Prisma, ProjectStatus, TaskStatus } from "@/generated/prisma/client";

export const getTask = cache(
  async <T extends Prisma.TaskSelect>(id: number, select: T) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { id, workspaceId };

    return prisma.task.findFirst({
      where,
      select,
    });
  },
);

export const getAllTasks = cache(
  async <T extends Prisma.TaskSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page: number;
    pageSize: number;
    sort: string;
    filters?: TaskFilters;
    select: T;
  }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize ? pageSize : undefined;

    const orderByMapping: Record<string, Prisma.TaskOrderByWithRelationInput> =
      {
        title: { title: "asc" },
        deadline: { deadline: "asc" },
        status: { status: "asc" },
        category: { category: { name: "asc" } },
      };

    const orderBy = sort ? orderByMapping[sort] : undefined;

    return await prisma.task.findMany({
      where: buildTaskWhereClause(workspaceId, filters),
      orderBy,
      skip,
      take,
      select,
    });
  },
);

export const getTaskCount = cache(async (filters?: TaskFilters) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  const where = buildTaskWhereClause(workspaceId, filters);

  return prisma.task.count({ where });
});

export const createTask = async (input: CreateTaskInputDTO) => {
  const {
    user: { id: creatorId, workspaceId },
  } = await verifySession();

  const canCreate = await canCreateTask();

  if (!canCreate) {
    throw new AccessDeniedError(
      "You do not have permission to create task in this workspace.",
    );
  }

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
  } = await verifySession();

  const canUpdate = await canUpdateTask();

  if (!canUpdate) {
    throw new AccessDeniedError(
      "You do not have permission to update task in this workspace.",
    );
  }

  await validateTaskRelations(workspaceId, input);

  return prisma.$transaction(async (tx) => {
    const existingTask = await tx.task.findUnique({
      where: { id: input.id, workspaceId },
      select: { project: { select: { status: true } } },
    });

    if (!existingTask) {
      return null;
    }

    let dataToUpdate = { ...input };

    if (input.status) {
      const allowedProjectStatuses = getAllowedProjectStatuses(input.status);
      const currentProjectStatus = existingTask.project.status as ProjectStatus;

      if (!allowedProjectStatuses.includes(currentProjectStatus)) {
        delete dataToUpdate.status;
      }
    }

    return tx.task.update({
      where: { id: input.id },
      data: dataToUpdate,
    });
  });
};

export const updateTasks = async (taskIds: number[], status: TaskStatus) => {
  const {
    user: { id: userId, workspaceId, role },
  } = await verifySession();

  const canUpdateStatus = await canUpdateTaskStatus();

  if (!canUpdateStatus) {
    throw new AccessDeniedError(
      "You do not have permission to update task statuses in this workspace.",
    );
  }

  const allowedProjectStatuses = getAllowedProjectStatuses(status);

  const ownershipFilter = role === "user" ? { assigneeId: userId } : {};

  return await prisma.task.updateMany({
    where: {
      id: { in: taskIds },
      workspaceId,
      ...ownershipFilter,
      project: {
        status: { in: allowedProjectStatuses },
      },
    },
    data: {
      status,
    },
  });
};

export const deleteTasks = async (ids: number[]) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  const canDelete = await canDeleteTask();

  if (!canDelete) {
    throw new AccessDeniedError(
      "You do not have permission to delete tasks in this workspace.",
    );
  }

  return await prisma.task.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });
};

/**
 * HELPERS
 */

const getAllowedProjectStatuses = (nextStatus: TaskStatus): ProjectStatus[] => {
  return (
    Object.keys(ALLOWED_TASK_STATUSES_BY_PROJECT) as ProjectStatus[]
  ).filter((ps) => ALLOWED_TASK_STATUSES_BY_PROJECT[ps].includes(nextStatus));
};

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

  if (!category) {
    throw new AccessDeniedError("Category access denied or not found");
  }

  if (!project) {
    throw new AccessDeniedError("Project access denied or not found");
  }

  if (!assignee) {
    throw new AccessDeniedError("Assignee access denied or not found");
  }
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
