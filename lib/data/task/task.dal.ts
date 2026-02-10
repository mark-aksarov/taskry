import {
  TaskListDTO,
  TaskSearchDTO,
  TaskDetailDTO,
  TaskSummaryDTO,
  TaskFormDataDTO,
  UpdateTaskInputDTO,
  CreateTaskInputDTO,
} from "./task.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TaskFilters } from "@/lib/types";
import { requireSession } from "../utils/requireSession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";
import { AccessDeniedError, NotFoundError } from "../utils/error";

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

    if (!task) {
      return null;
    }

    return {
      id: task.id,
      title: task.title,
      description: task.description ?? undefined,
      deadline: task.deadline,
      assignee: task.assignee
        ? {
            id: task.assignee.id,
            fullName: task.assignee.fullName,
            imageUrl: task.assignee.imageUrl ?? undefined,
          }
        : undefined,
      status: task.status,
      project: task.project,
      category: task.category ?? undefined,
      subtasks: task.subtasks,
      attachments: task.attachments,
      commentsCount: task._count.comments,
    };
  },
);

export const getTaskFormData = cache(
  async (id: number): Promise<TaskFormDataDTO | null> => {
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
      deadline: task.deadline,
      status: task.status,
      categoryId: task.categoryId ?? undefined,
      projectId: task.projectId ?? undefined,
      projectStatus: task.project.status,
      assigneeId: task.assigneeId ?? undefined,
    };
  },
);

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

export const getTaskList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
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
    } else if (sort === "category") {
      orderBy = { category: { name: "asc" } };
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
        deadline: task.deadline ?? undefined,
        assignee: task.assignee
          ? {
              id: task.assignee.id,
              fullName: task.assignee.fullName,
              imageUrl: task.assignee.imageUrl ?? undefined,
            }
          : undefined,
        project: task.project,
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

export const searchTasks = cache(
  async ({
    query,
    page,
    pageSize,
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
  }): Promise<TaskSearchDTO> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get tasks
    const where = {
      workspaceId,
      title: { contains: query, mode: "insensitive" as const },
    };

    const [items, totalCount] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
          id: true,
          title: true,
          deadline: true,
        },
      }),
      prisma.task.count({ where }),
    ]);

    //Map to DTO
    return {
      items: items.map((t) => ({
        id: t.id,
        title: t.title,
        deadline: t.deadline,
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
      deadline: input.deadline,
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
      deadline: input.deadline,
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
    throw new NotFoundError("Task category not found");
  }

  if (category.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Task category access denied");
  }
}

// Validate that project exists and belongs to the workspace
async function validateProject(workspaceId: number, projectId: number) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { workspaceId: true },
  });

  if (!project) {
    throw new NotFoundError("Project not found");
  }

  if (project.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Project access denied");
  }
}

// Validate that assignee exists and belongs to the workspace
async function validateAssignee(workspaceId: number, assigneeId: string) {
  const assignee = await prisma.user.findFirst({
    where: { id: assigneeId },
    select: { workspaceId: true },
  });

  if (!assignee) {
    throw new NotFoundError("Assignee not found");
  }

  if (assignee.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Assignee access denied");
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
