import {
  TaskDTO,
  TaskListDTO,
  TaskDetailDTO,
  TaskSummaryDTO,
  UpdateTaskInputDTO,
  CreateTaskInputDTO,
} from "./task.dto";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
} from "../utils/error";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TASK_MAX_COUNT } from "../constants";
import { TaskFilters, TaskSortField } from "@/lib/types";
import { requireSession } from "../utils/requireSession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";

export const getTaskDetail = cache(
  async (id: number): Promise<TaskDetailDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const task = await prisma.task.findFirst({
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
          orderBy: [{ isDone: "desc" }, { createdAt: "asc" }],
          select: {
            id: true,
            text: true,
            isDone: true,
          },
        },
        creator: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!task) {
      return null;
    }

    return {
      id: task.id,
      title: task.title,
      description: task.description ?? undefined,
      deadline: task.deadline.toISOString(),
      creator: task.creator
        ? {
            id: task.creator.id,
            fullName: task.creator.fullName,
            imageUrl: task.creator.imageUrl ?? undefined,
          }
        : undefined,
      assignee: task.assignee
        ? {
            id: task.assignee.id,
            fullName: task.assignee.fullName,
            imageUrl: task.assignee.imageUrl ?? undefined,
          }
        : undefined,
      status: task.status,
      project: task.project ?? undefined,
      category: task.category ?? undefined,
      subtasks: task.subtasks,
      commentsCount: task._count.comments,
    };
  },
);

export const getTask = cache(async (id: number): Promise<TaskDTO | null> => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  const task = await prisma.task.findFirst({
    where: { id, workspaceId },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,
      status: true,
      categoryId: true,
      projectId: true,
      project: {
        select: {
          status: true,
        },
      },
      assigneeId: true,
    },
  });

  if (!task) {
    return null;
  }

  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline.toISOString(),
    status: task.status,
    categoryId: task.categoryId ?? undefined,
    projectId: task.projectId ?? undefined,
    assigneeId: task.assigneeId ?? undefined,
  };
});

export const getTaskSummary = cache(
  async (id: number): Promise<TaskSummaryDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const task = await prisma.task.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        title: true,
      },
    });

    if (!task) {
      return null;
    }

    return {
      id: task.id,
      title: task.title,
    };
  },
);

export const getTasks = cache(async (): Promise<TaskDTO[]> => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  const tasks = await prisma.task.findMany({
    where: { workspaceId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,
      status: true,
      projectId: true,
      categoryId: true,
      assigneeId: true,
    },
  });

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline.toISOString(),
    status: task.status,
    projectId: task.projectId ?? undefined,
    categoryId: task.categoryId ?? undefined,
    assigneeId: task.assigneeId ?? undefined,
  }));
});

export const getTaskList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    sort?: TaskSortField;
    filters?: TaskFilters;
  }): Promise<TaskListDTO> => {
    // Authorization
    const {
      user: { id: userId, workspaceId },
    } = await requireSession();

    // Sorting
    let orderBy: Prisma.ProjectOrderByWithRelationInput;

    if (sort === "title") {
      orderBy = { title: "asc" };
    } else if (sort === "deadline") {
      orderBy = { deadline: "asc" };
    } else if (sort === "status") {
      orderBy = { status: "asc" };
    } else {
      orderBy = { createdAt: "desc" };
    }

    // Get tasks
    const where = buildTaskWhereClause(userId, workspaceId, filters);

    const [items, totalCount] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy,
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
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
      }),
      prisma.task.count({ where }),
    ]);

    // Map to DTO
    return {
      items: items.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        deadline: task.deadline.toISOString(),
        assignee: task.assignee
          ? {
              id: task.assignee.id,
              fullName: task.assignee.fullName,
              imageUrl: task.assignee.imageUrl ?? undefined,
            }
          : undefined,
        project: task.project ?? undefined,
        category: task.category ?? undefined,
        commentsCount: task._count.comments,
        subtasks: {
          total: task._count.subtasks,
          done: task.subtasks.filter((s) => s.isDone).length,
        },
      })),

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

  // Validate limit
  await validateTaskLimit(workspaceId);

  // Validate category
  if (input.categoryId) {
    await validateTaskCategory(workspaceId, input.categoryId);
  }

  // Validate project
  if (input.projectId) {
    await validateProject(workspaceId, input.projectId);
  }

  // Validate assignee
  if (input.assigneeId) {
    await validateAssignee(workspaceId, input.assigneeId);
  }

  // Create task
  const task = await prisma.task.create({
    data: {
      title: input.title,
      description: input.description,
      deadline: new Date(input.deadline),
      status: input.status,
      projectId: input.projectId,
      categoryId: input.categoryId,
      assigneeId: input.assigneeId,
      creatorId: userId,
      workspaceId,
    },
  });

  return task;
};

export const createTasks = async (input: CreateTaskInputDTO[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        task: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to create tasks.");
  }

  // Validate limit
  await validateTaskLimit(workspaceId, input.length);

  // Validate categories
  const categoryIds = input
    .map((task) => task.categoryId)
    .filter((id): id is number => id !== undefined);

  if (categoryIds.length > 0) {
    await validateTaskCategories(workspaceId, categoryIds);
  }

  // Validate projects
  const projectIds = input
    .map((task) => task.projectId)
    .filter((id): id is number => id !== undefined);

  if (projectIds.length > 0) {
    await validateProjects(workspaceId, projectIds);
  }

  // Validate assignees
  const assigneeIds = input
    .map((task) => task.assigneeId)
    .filter((id): id is string => id !== undefined);

  if (assigneeIds) {
    await validateAssignees(workspaceId, assigneeIds);
  }

  const tasks = await prisma.task.createManyAndReturn({
    data: input.map((task) => ({
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline),
      status: task.status,
      projectId: task.projectId,
      categoryId: task.categoryId,
      assigneeId: task.assigneeId,
      creatorId: userId,
      workspaceId,
    })),
  });

  return tasks;
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
        task: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to update task.");
  }

  // Validate category
  if (input.categoryId) {
    await validateTaskCategory(workspaceId, input.categoryId);
  }

  // Validate project
  if (input.projectId) {
    await validateProject(workspaceId, input.projectId);
  }

  // Validate assignee
  if (input.assigneeId) {
    await validateAssignee(workspaceId, input.assigneeId);
  }

  // Update task
  const updatedTask = await prisma.task.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      title: input.title,
      description: input.description,
      deadline: input.deadline ? new Date(input.deadline) : undefined,
      status: input.status,
      projectId: input.projectId,
      categoryId: input.categoryId,
      assigneeId: input.assigneeId,
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

// Validate that task category exists and belongs to the workspace
async function validateTaskCategory(workspaceId: number, categoryId: number) {
  const category = await prisma.taskCategory.findUnique({
    where: { id: categoryId },
    select: { workspaceId: true },
  });

  if (!category) {
    throw new NotFoundError("Task category not found", "taskCategoryNotFound");
  }

  if (category.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Task category access denied");
  }
}

async function validateTaskCategories(
  workspaceId: number,
  categoryIds: number[],
) {
  const categories = await prisma.taskCategory.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  for (const categoryId of categoryIds) {
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      throw new NotFoundError("Task category not found");
    }

    if (category.workspaceId !== workspaceId) {
      throw new AccessDeniedError("Task category access denied");
    }
  }
}

// Validate that project exists and belongs to the workspace
async function validateProject(workspaceId: number, projectId: number) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { workspaceId: true },
  });

  if (!project) {
    throw new NotFoundError("Project not found", "projectNotFound");
  }

  if (project.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Project access denied");
  }
}

async function validateProjects(workspaceId: number, projectIds: number[]) {
  const projects = await prisma.project.findMany({
    where: {
      id: {
        in: projectIds,
      },
    },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  for (const projectId of projectIds) {
    const project = projects.find((item) => item.id === projectId);

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    if (project.workspaceId !== workspaceId) {
      throw new AccessDeniedError("Project access denied");
    }
  }
}

// Validate that assignee exists and belongs to the workspace
async function validateAssignee(workspaceId: number, assigneeId: string) {
  const assignee = await prisma.user.findFirst({
    where: { id: assigneeId },
    select: { workspaceId: true },
  });

  if (!assignee) {
    throw new NotFoundError("Assignee not found", "assigneeNotFound");
  }

  if (assignee.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Assignee access denied");
  }
}

async function validateAssignees(workspaceId: number, assigneeIds: string[]) {
  const assignees = await prisma.user.findMany({
    where: {
      id: {
        in: assigneeIds,
      },
    },
    select: {
      id: true,
      workspaceId: true,
    },
  });

  for (const assigneeId of assigneeIds) {
    const assignee = assignees.find((item) => item.id === assigneeId);

    if (!assignee) {
      throw new NotFoundError("Assignee not found");
    }

    if (assignee.workspaceId !== workspaceId) {
      throw new AccessDeniedError("Assignee access denied");
    }
  }
}

// Validate that task limit has not been reached
async function validateTaskLimit(workspaceId: number, newTasksCount = 1) {
  const existingCount = await prisma.task.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newTasksCount > TASK_MAX_COUNT) {
    throw new LimitExceededError(
      `You cannot create more than ${TASK_MAX_COUNT} tasks.`,
    );
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
      title: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters.onlyMyTasks && { assigneeId: userId }),
    ...(filters.statuses?.length && { status: { in: filters.statuses } }),
    ...(filters.categoryIds?.length && {
      categoryId: { in: filters.categoryIds },
    }),
    ...(filters.projectIds?.length && {
      projectId: { in: filters.projectIds },
    }),
    ...(filters.assigneeIds?.length && {
      assigneeId: { in: filters.assigneeIds },
    }),
    deadline: {
      ...(filters.deadlineFrom && { gte: new Date(filters.deadlineFrom) }),
      ...(filters.deadlineTo && { lte: new Date(filters.deadlineTo) }),
    },
  };
}
