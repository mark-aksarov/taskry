import {
  canCreateTask,
  canDeleteTask,
  canUpdateTask,
  canUpdateTaskStatus,
} from "../user/user.dal";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TaskFilters } from "@/lib/types";
import { buildDateWhere } from "../utils/dateWhere";
import { verifySession } from "../utils/verifySession";
import { AccessDeniedError, DomainRuleError } from "../utils/error";
import { UpdateTaskInputDTO, CreateTaskInputDTO } from "./task.dto";
import { ALLOWED_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";
import { Prisma, ProjectStatus, TaskStatus } from "@/generated/prisma/client";
import { createTaskAddedNotifications } from "../notification/notification.dal";

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
      user: { id: userId, workspaceId },
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
      where: buildTaskWhereClause(userId, workspaceId, filters),
      orderBy,
      skip,
      take,
      select,
    });
  },
);

export const getTaskCount = cache(async (filters?: TaskFilters) => {
  const {
    user: { id: userId, workspaceId },
  } = await verifySession();

  const where = buildTaskWhereClause(userId, workspaceId, filters);

  return prisma.task.count({ where });
});

export const createTask = async (input: CreateTaskInputDTO) => {
  const {
    user: { id: creatorId, workspaceId },
  } = await verifySession();

  const canCreate = await canCreateTask();

  if (!canCreate) {
    throw new AccessDeniedError("You do not have permission to create task.");
  }

  await validateTaskRelations(workspaceId, input);

  return prisma.$transaction(async (tx) => {
    const task = await tx.task.create({
      data: {
        ...input,
        creatorId,
        workspaceId,
      },
    });

    await createTaskAddedNotifications(tx, {
      task,
      actorId: creatorId,
      workspaceId,
    });

    return task;
  });
};

export const updateTask = async (input: UpdateTaskInputDTO) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  const canUpdate = await canUpdateTask();

  if (!canUpdate) {
    throw new AccessDeniedError();
  }

  return prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({
      where: { id: input.id, workspaceId },
      select: {
        project: { select: { status: true } },
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    if (input.status) {
      const allowed = getAllowedProjectStatuses(input.status);

      if (!allowed.includes(task.project.status)) {
        throw new DomainRuleError(
          `Cannot change task status to ${input.status} while project is ${task.project.status}`,
        );
      }
    }

    return tx.task.update({
      where: { id: input.id },
      data: input,
    });
  });
};

export const updateTaskStatuses = async (
  taskIds: number[],
  status: TaskStatus,
) => {
  const {
    user: { id: userId, workspaceId, role },
  } = await verifySession();

  const canUpdateStatus = await canUpdateTaskStatus();

  if (!canUpdateStatus) {
    throw new AccessDeniedError(
      "You do not have permission to update task statuses.",
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
    throw new AccessDeniedError("You do not have permission to delete tasks.");
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
  userId: string,
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
    ...(filters.onlyMyTasks && { assigneeId: userId }),
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.project?.length && { projectId: { in: filters.project } }),
    ...(filters.assignee?.length && { assigneeId: { in: filters.assignee } }),
    ...(datesWhere && { deadline: datesWhere }),
  };
}
