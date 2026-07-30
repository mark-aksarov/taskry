import {
  TaskDTO,
  TaskCsvDTO,
  TaskListDTO,
  TaskDetailDTO,
  TaskSummaryDTO,
  UpdateTaskInputDTO,
  CreateTaskInputDTO,
} from "./task.dto";

import {
  validateUsers,
  validateProjects,
  validateTaskLimit,
  validateValuesExist,
  validateTaskCategories,
} from "../utils/validation";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { format } from "date-fns";
import { headers } from "next/headers";
import { TaskFilters, TaskSortField } from "@/lib/types";
import { uniqueDefinedIds } from "../utils/uniqueDefinedIds";
import { AccessDeniedError, NotFoundError } from "../utils/error";
import { Prisma, Task, TaskStatus } from "@/generated/prisma/client";
import { uniqueDefinedStrings } from "../utils/uniqueDefinedStrings";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";

export const getTaskDetail = cache(
  async (id: number): Promise<TaskDetailDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    const task = await prisma.task.findFirst({
      where: { id, organizationId },
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const task = await prisma.task.findFirst({
    where: { id, organizationId },
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
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    const task = await prisma.task.findFirst({
      where: { id, organizationId },
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

export const exportTasks = cache(async (): Promise<TaskCsvDTO[]> => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const tasks = await prisma.task.findMany({
    where: { organizationId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      description: true,
      deadline: true,
      status: true,
      project: {
        select: {
          title: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      assignee: {
        select: {
          email: true,
        },
      },
    },
  });

  return tasks.map((task) => ({
    title: task.title,
    description: task.description ?? undefined,
    deadline: format(task.deadline, "yyyy-MM-dd"),
    status: task.status,
    projectTitle: task.project ? task.project.title : undefined,
    categoryName: task.category ? task.category.name : undefined,
    assigneeEmail: task.assignee ? task.assignee.email : undefined,
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
      user: { id: userId },
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

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
    const where = buildTaskWhereClause(userId, organizationId, filters);

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
    user: { id: userId },
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const where = buildTaskWhereClause(userId, organizationId, filters);

  return prisma.task.count({ where });
});

export const createTasks = async (input: CreateTaskInputDTO[]) => {
  // Authorization
  const {
    user: { id: userId },
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        task: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to create tasks.");
  }

  // Validate limit
  await validateTaskLimit(organizationId, input.length);

  // Validate categories
  const categoryIds = uniqueDefinedIds(input.map((task) => task.categoryId));

  if (categoryIds.length > 0) {
    await validateTaskCategories(organizationId, categoryIds);
  }

  // Validate projects
  const projectIds = uniqueDefinedIds(input.map((task) => task.projectId));

  if (projectIds.length > 0) {
    await validateProjects(organizationId, projectIds);
  }

  // Validate assignees
  const assigneeIds = uniqueDefinedIds(input.map((task) => task.assigneeId));

  if (assigneeIds.length > 0) {
    await validateUsers(organizationId, assigneeIds);
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
      organizationId,
    })),
  });

  return tasks.map(mapToTaskDTO);
};

export const importTasks = async (input: TaskCsvDTO[]) => {
  // Authorization
  const {
    user: { id: userId },
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        task: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to create tasks.");
  }

  // Validate limit
  await validateTaskLimit(organizationId, input.length);

  // Get existing projects by title
  const projectTitles = uniqueDefinedStrings(
    input.map((task) => task.projectTitle),
  );

  const existingProjects = await prisma.project.findMany({
    where: {
      organizationId,
      title: {
        in: projectTitles,
      },
    },
    select: {
      id: true,
      title: true,
    },
  });

  const existingProjectTitles = new Set(
    existingProjects.map((project) => project.title),
  );

  // Check if all projects exist
  validateValuesExist(
    projectTitles,
    existingProjectTitles,
    "Projects not found",
  );

  // Get existing categories by name
  const categoryNames = uniqueDefinedStrings(
    input.map((task) => task.categoryName),
  );

  const existingCategories = await prisma.taskCategory.findMany({
    where: {
      organizationId,
      name: {
        in: categoryNames,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const existingCategoryNames = new Set(
    existingCategories.map((category) => category.name),
  );

  // Check if all categories exist
  validateValuesExist(
    categoryNames,
    existingCategoryNames,
    "Task categories not found",
  );

  // Get existing assignees by email
  const assigneeEmails = uniqueDefinedStrings(
    input.map((task) => task.assigneeEmail),
  );

  const existingAssignees = await prisma.user.findMany({
    where: {
      members: {
        some: {
          organizationId,
        },
      },
      email: {
        in: assigneeEmails,
      },
    },
    select: {
      id: true,
      email: true,
    },
  });

  const existingAssigneeEmails = new Set(
    existingAssignees.map((assignee) => assignee.email),
  );

  // Check if all assignees exist
  validateValuesExist(
    assigneeEmails,
    existingAssigneeEmails,
    "Assignees not found",
  );

  // Create tasks
  const projectMap = new Map(
    existingProjects.map((project) => [project.title, project.id]),
  );

  const categoryMap = new Map(
    existingCategories.map((category) => [category.name, category.id]),
  );

  const assigneeMap = new Map(
    existingAssignees.map((assignee) => [assignee.email, assignee.id]),
  );

  const tasks = await prisma.task.createManyAndReturn({
    data: input.map((task) => ({
      title: task.title,
      description: task.description,
      deadline: new Date(task.deadline),
      status: task.status,
      projectId: task.projectTitle ? projectMap.get(task.projectTitle) : null,
      categoryId: task.categoryName ? categoryMap.get(task.categoryName) : null,
      assigneeId: task.assigneeEmail
        ? assigneeMap.get(task.assigneeEmail)
        : null,
      creatorId: userId,
      organizationId,
    })),
  });

  return tasks.map(mapToTaskDTO);
};

export const updateTask = async (input: UpdateTaskInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        task: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to update task.");
  }

  // Validate category
  if (input.categoryId) {
    await validateTaskCategories(organizationId, [input.categoryId]);
  }

  // Validate project
  if (input.projectId) {
    await validateProjects(organizationId, [input.projectId]);
  }

  // Validate assignee
  if (input.assigneeId) {
    await validateUsers(organizationId, [input.assigneeId]);
  }

  // Update task
  const updatedTask = await prisma.task.update({
    where: {
      id: input.id,
      organizationId,
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

  return mapToTaskDTO(updatedTask);
};

export const updateTaskStatuses = async (
  taskIds: number[],
  status: TaskStatus,
) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        task: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to update task.");
  }

  // Update tasks
  const updatedTasks = await prisma.task.updateManyAndReturn({
    where: {
      organizationId,
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
      deadline: true,
      projectId: true,
      categoryId: true,
      assigneeId: true,
      description: true,
    },
  });

  return updatedTasks.map(mapToTaskDTO);
};

export const deleteTasks = async (ids: number[]) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        task: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to delete tasks.");
  }

  // Bulk delete tasks
  const result = await prisma.task.deleteMany({
    where: {
      organizationId,
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

function buildTaskWhereClause(
  userId: string,
  organizationId: string,
  filters?: TaskFilters,
): Prisma.TaskWhereInput {
  if (!filters) return { organizationId };

  return {
    organizationId,

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

function mapToTaskDTO(
  task: Pick<
    Task,
    | "id"
    | "title"
    | "description"
    | "deadline"
    | "status"
    | "projectId"
    | "categoryId"
    | "assigneeId"
  >,
): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline.toISOString(),
    status: task.status,
    projectId: task.projectId ?? undefined,
    categoryId: task.categoryId ?? undefined,
    assigneeId: task.assigneeId ?? undefined,
  };
}
