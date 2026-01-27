import {
  createTaskAddedNotifications,
  createTaskDeletedNotifications,
  createTaskChangedNotifications,
} from "../notification/notification.dal";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TaskFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { verifySession } from "../utils/verifySession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";
import { UpdateTaskInputDTO, CreateTaskInputDTO } from "./task.dto";

export const getTask = cache(
  async <T extends Prisma.TaskSelect>(id: number, select: T) => {
    // Authorization
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
  async <T extends Prisma.TaskSelect>({ select }: { select: T }) => {
    // Authorization
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { workspaceId };

    return await prisma.task.findMany({
      where,
      select,
    });
  },
);

export const getPaginatedTasks = cache(
  async <T extends Prisma.TaskSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: TaskFilters;
    select: T;
  }) => {
    // Authorization
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
    const where = buildTaskWhereClause(userId, workspaceId, filters);

    const [items, totalCount] = await prisma.$transaction([
      prisma.task.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      prisma.task.count({ where }),
    ]);

    return {
      items,
      totalCount,
    };
  },
);

export const getTaskCount = cache(async (filters?: TaskFilters) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await verifySession();

  const where = buildTaskWhereClause(userId, workspaceId, filters);

  return prisma.task.count({ where });
});

export const createTask = async (input: CreateTaskInputDTO) => {
  // Authorization
  const {
    user: { id: creatorId, workspaceId },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: creatorId,
      permission: {
        task: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to create task.");
  }

  // Check related resources access
  await checkTaskResourcesAccess(workspaceId, input);

  return prisma.$transaction(async (tx) => {
    // Create task within the workspace
    const task = await tx.task.create({
      data: {
        title: input.title,
        description: input.description,
        deadline: input.deadline,
        status: input.status,
        projectId: input.projectId,
        categoryId: input.categoryId,
        assigneeId: input.assigneeId,
        creatorId,
        workspaceId,
      },
    });

    // Send notifications
    await createTaskAddedNotifications(tx, {
      task,
      actorId: creatorId,
      workspaceId,
    });

    return task;
  });
};

export const updateTask = async (input: UpdateTaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await verifySession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        task: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to update task.");
  }

  // Check access to related resources
  await checkTaskResourcesAccess(workspaceId, input);

  return prisma.$transaction(async (tx) => {
    // Update task and get new data
    const updatedTask = await tx.task.update({
      where: {
        id: input.id,
        workspaceId,
      },
      data: {
        title: input.title,
        description: input.description,
        deadline: input.deadline,
        status: input.status,
        projectId: input.projectId,
        categoryId: input.categoryId,
        assigneeId: input.assigneeId,
      },
    });

    // Send notifications using the updated task
    await createTaskChangedNotifications(tx, {
      tasks: [updatedTask],
      actorId: userId,
      workspaceId,
    });

    return updatedTask;
  });
};

export const updateTaskStatuses = async (
  taskIds: number[],
  status: TaskStatus,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await verifySession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        task: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to update task.");
  }

  return prisma.$transaction(async (tx) => {
    // Update tasks and return new data
    const updatedTasks = await tx.task.updateManyAndReturn({
      where: {
        workspaceId,
        id: {
          in: taskIds,
        },
      },
      data: {
        status,
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
    });

    if (updatedTasks.length === 0) {
      return [];
    }

    // Send notifications with updated data
    await createTaskChangedNotifications(tx, {
      tasks: updatedTasks,
      actorId: userId,
      workspaceId,
    });

    return updatedTasks;
  });
};

export const deleteTasks = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: actorId, workspaceId },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: actorId,
      permission: {
        task: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to delete tasks.");
  }

  return prisma.$transaction(async (tx) => {
    // Fetch task details before deletion for notifications
    const tasksToDelete = await tx.task.findMany({
      where: {
        workspaceId,
        id: {
          in: ids,
        },
      },
      select: {
        title: true,
        assigneeId: true,
      },
    });

    if (tasksToDelete.length === 0) {
      return {
        count: 0,
      };
    }

    // Bulk delete tasks within the workspace
    const result = await tx.task.deleteMany({
      where: {
        workspaceId,
        id: {
          in: ids,
        },
      },
    });

    // Send batched notifications
    await createTaskDeletedNotifications(tx, {
      tasks: tasksToDelete,
      actorId,
      workspaceId,
    });

    return result;
  });
};

/**
 * HELPERS
 */

async function checkTaskResourcesAccess(
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

  return {
    workspaceId,

    ...(filters.query && {
      OR: [
        { title: { contains: filters.query, mode: "insensitive" as const } },
      ],
    }),

    ...(filters.onlyMyTasks && { assigneeId: userId }),
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.project?.length && { projectId: { in: filters.project } }),
    ...(filters.assignee?.length && { assigneeId: { in: filters.assignee } }),
    deadline: {
      ...(filters.deadlineFrom && { gte: filters.deadlineFrom }),
      ...(filters.deadlineTo && { lte: filters.deadlineTo }),
    },
  };
}
