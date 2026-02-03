import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TaskFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";
import { UpdateTaskInputDTO, CreateTaskInputDTO } from "./task.dto";

export const getTask = cache(
  async <T extends Prisma.TaskSelect>(id: number, select: T) => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

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
    } = await requireSession();

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
    } = await requireSession();

    const skip = page && pageSize ? (page - 1) * pageSize : Prisma.skip;
    const take = pageSize ? pageSize : Prisma.skip;

    const orderByMapping: Record<string, Prisma.TaskOrderByWithRelationInput> =
      {
        title: { title: "asc" },
        deadline: { deadline: "asc" },
        status: { status: "asc" },
        category: { category: { name: "asc" } },
      };

    const orderBy = sort ? orderByMapping[sort] : Prisma.skip;
    const where = buildTaskWhereClause(userId, workspaceId, filters);

    const [items, totalCount] = await Promise.all([
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
  } = await requireSession();

  const where = buildTaskWhereClause(userId, workspaceId, filters);

  return prisma.task.count({ where });
});

export const createTask = async (input: CreateTaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        task: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to create task.");
  }

  // Check related resources access
  await checkTaskResourcesAccess(
    workspaceId,
    input.categoryId,
    input.projectId,
    input.assigneeId,
  );

  // Create task
  const task = await prisma.task.create({
    data: {
      title: input.title,
      description: input.description ?? Prisma.skip,
      deadline: input.deadline,
      status: input.status,
      projectId: input.projectId,
      categoryId: input.categoryId,
      assigneeId: input.assigneeId ?? Prisma.skip,
      creatorId: userId,
      workspaceId,
    },
  });

  return task;
};

export const updateTask = async (input: UpdateTaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

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
  await checkTaskResourcesAccess(
    workspaceId,
    input.categoryId,
    input.projectId,
    input.assigneeId,
  );

  // Update task
  const updatedTask = await prisma.task.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      title: input.title ?? Prisma.skip,
      description: input.description ?? Prisma.skip,
      deadline: input.deadline ?? Prisma.skip,
      status: input.status ?? Prisma.skip,
      projectId: input.projectId ?? Prisma.skip,
      categoryId: input.categoryId ?? Prisma.skip,
      assigneeId: input.assigneeId ?? Prisma.skip,
    },
  });

  return updatedTask;
};

export const updateTaskStatuses = async (
  taskIds: number[],
  status: TaskStatus,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

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

  // Update tasks
  const updatedTasks = await prisma.task.updateManyAndReturn({
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

  return updatedTasks;
};

export const deleteTasks = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: actorId, workspaceId },
  } = await requireSession();

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

  // Bulk delete tasks
  const result = await prisma.task.deleteMany({
    where: {
      workspaceId,
      id: {
        in: ids,
      },
    },
  });

  return result;
};

/**
 * HELPERS
 */

async function checkTaskResourcesAccess(
  workspaceId: number,
  categoryId?: number,
  projectId?: number,
  assigneeId?: string,
) {
  if (categoryId) {
    const category = await prisma.taskCategory.findFirst({
      where: { id: categoryId, workspaceId },
    });

    if (!category) {
      throw new AccessDeniedError("Category access denied or not found");
    }
  }

  if (projectId) {
    const project = await prisma.project.findFirst({
      where: { id: projectId, workspaceId },
    });

    if (!project) {
      throw new AccessDeniedError("Project access denied or not found");
    }
  }

  if (assigneeId) {
    const assignee = await prisma.user.findFirst({
      where: { id: assigneeId, workspaceId },
    });

    if (!assignee) {
      throw new AccessDeniedError("Assignee access denied or not found");
    }
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
