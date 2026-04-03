import "server-only";

import {
  ProjectDetailDTO,
  ProjectSummaryDTO,
  ProjectFormDataDTO,
  UpdateProjectInputDTO,
  CreateProjectInputDTO,
  ProjectListDTO,
} from "./project.dto";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProjectFilters, ProjectSortField } from "@/lib/types";
import { requireSession } from "../utils/requireSession";
import { AccessDeniedError, NotFoundError } from "../utils/error";
import { Prisma, TaskStatus, ProjectStatus } from "@/generated/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const getProjectDetail = cache(
  async (id: number): Promise<ProjectDetailDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        title: true,
        description: true,
        deadline: true,
        status: true,

        creator: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },

        customer: {
          select: {
            id: true,
            fullName: true,
          },
        },

        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!project) {
      return null;
    }

    // Map to DTO
    return {
      id: project.id,
      title: project.title,
      description: project.description ?? undefined,
      deadline: project.deadline.toISOString(),
      status: project.status,
      categoryId: project.category?.id,
      customerId: project.customer?.id,
      creator: project.creator
        ? {
            id: project.creator.id,
            fullName: project.creator.fullName,
            imageUrl: project.creator.imageUrl ?? undefined,
          }
        : undefined,
      customer: project.customer
        ? {
            id: project.customer.id,
            fullName: project.customer.fullName,
          }
        : undefined,
      category: project.category ?? undefined,
    };
  },
);

export const getProjectFormData = cache(
  async (id: number): Promise<ProjectFormDataDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        title: true,
        description: true,
        deadline: true,
        status: true,
        categoryId: true,
        customerId: true,
      },
    });

    if (!project) {
      return null;
    }

    // Map to DTO
    return {
      id: project.id,
      title: project.title,
      description: project.description ?? undefined,
      deadline: project.deadline.toISOString(),
      status: project.status,
      categoryId: project.categoryId ?? undefined,
      customerId: project.customerId ?? undefined,
    };
  },
);

export const getProjectSummary = cache(
  async (id: number): Promise<ProjectSummaryDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        title: true,
      },
    });

    if (!project) {
      return null;
    }

    // Map to DTO
    return {
      id: project.id,
      title: project.title,
    };
  },
);

export const getProjectSummaries = cache(
  async (): Promise<ProjectSummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    let where = { workspaceId };

    // Get projects
    const projects = await prisma.project.findMany({
      where,
      select: {
        id: true,
        title: true,
      },
    });

    // Map to DTO
    return projects.map((p) => ({
      id: p.id,
      title: p.title,
    }));
  },
);

export const getProjectList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    sort?: ProjectSortField;
    filters?: ProjectFilters;
  }): Promise<ProjectListDTO> => {
    // Authorization
    const {
      user: { workspaceId },
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

    const where = buildProjectWhereClause(workspaceId, filters);

    // Get projects
    const [items, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy,
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
          id: true,
          title: true,
          deadline: true,
          status: true,

          creator: {
            select: {
              id: true,
              fullName: true,
              imageUrl: true,
            },
          },
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          customer: {
            select: {
              id: true,
              fullName: true,
              imageUrl: true,
              company: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
          tasks: {
            select: {
              status: true,
            },
          },
        },
      }),
      prisma.project.count({ where }),
    ]);

    // Map to DTO
    return {
      items: items.map((p) => {
        const totalTasks = p.tasks.length;
        const completedTasks = p.tasks.filter(
          (t: any) => t.status === "completed",
        ).length;

        return {
          id: p.id,
          title: p.title,
          status: p.status,
          deadline: p.deadline.toISOString(),
          creator: p.creator
            ? {
                id: p.creator.id,
                fullName: p.creator.fullName,
                imageUrl: p.creator.imageUrl ?? undefined,
              }
            : undefined,
          customer: p.customer
            ? {
                id: p.customer.id,
                fullName: p.customer.fullName,
                imageUrl: p.customer.imageUrl ?? undefined,
                company: p.customer.company
                  ? {
                      id: p.customer.company.id,
                      name: p.customer.company.name,
                    }
                  : undefined,
              }
            : undefined,
          category: p.category
            ? {
                id: p.category.id,
                name: p.category.name,
              }
            : undefined,
          commentsCount: p._count.comments,
          tasks: {
            total: totalTasks,
            completed: completedTasks,
          },
        };
      }),

      totalCount,
    };
  },
);

export const getProjectCount = cache(async (filters?: ProjectFilters) => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.project.count({
    where: buildProjectWhereClause(workspaceId, filters),
  });
});

export const createProject = async (input: CreateProjectInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        project: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create project.",
    );
  }

  // Validate category
  if (input.categoryId) {
    await validateProjectCategory(workspaceId, input.categoryId);
  }

  // Validate customer
  if (input.customerId) {
    await validateCustomer(workspaceId, input.customerId);
  }

  const project = await prisma.project.create({
    data: {
      title: input.title,
      description: input.description,
      deadline: new Date(input.deadline),
      customerId: input.customerId,
      categoryId: input.categoryId,
      status: input.status,
      creatorId: userId,
      workspaceId,
    },
  });

  return project;
};

export const updateProject = async (input: UpdateProjectInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        project: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project.",
    );
  }

  // Validate category
  if (input.categoryId) {
    await validateProjectCategory(workspaceId, input.categoryId);
  }

  // Validate customer
  if (input.customerId) {
    await validateCustomer(workspaceId, input.customerId);
  }

  // Update project
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: input.id,
        workspaceId,
      },
      data: {
        title: input.title,
        description: input.description,
        deadline: new Date(input.deadline),
        customerId: input.customerId,
        categoryId: input.categoryId,
        status: input.status,
      },
    });

    return updatedProject;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new NotFoundError("Project not found.", "projectNotFound");
    }
  }
};

export const updateProjectStatuses = async (
  ids: number[],
  status: ProjectStatus,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        project: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project.",
    );
  }

  // Update projects

  const updatedProjects = await prisma.project.updateManyAndReturn({
    where: {
      id: { in: ids },
      workspaceId,
    },
    data: {
      status,
    },
  });

  return updatedProjects;
};

export const deleteProjects = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        project: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError("You do not have permission to delete tasks.");
  }

  // Bulk delete projects
  const deletedProjects = await prisma.project.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return deletedProjects;
};

/**
 * HELPERS
 */

// Validate that project category exists and belongs to the workspace
async function validateProjectCategory(
  workspaceId: number,
  categoryId: number,
) {
  const category = await prisma.projectCategory.findUnique({
    where: { id: categoryId },
    select: { workspaceId: true },
  });

  if (!category) {
    throw new NotFoundError(
      "Project category not found",
      "projectCategoryNotFound",
    );
  }

  if (category.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Project category access denied");
  }
}

// Validate that customer exists and belongs to the workspace
async function validateCustomer(workspaceId: number, customerId: number) {
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
    select: { workspaceId: true },
  });

  if (!customer) {
    throw new NotFoundError("Customer not found", "customerNotFound");
  }

  if (customer.workspaceId !== workspaceId) {
    throw new AccessDeniedError("Customer access denied");
  }
}

export function buildProjectWhereClause(
  workspaceId: number,
  filters?: ProjectFilters,
): Prisma.ProjectWhereInput {
  if (!filters) return { workspaceId };

  return {
    workspaceId,

    ...(filters.query && {
      title: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters.noActiveTasks && {
      status: ProjectStatus.active,
      tasks: { none: { status: TaskStatus.active } },
    }),
    ...(filters.statuses?.length && { status: { in: filters.statuses } }),
    ...(filters.categoryIds?.length && {
      categoryId: { in: filters.categoryIds },
    }),
    ...(filters.customerIds?.length && {
      customerId: { in: filters.customerIds },
    }),
    ...(filters.creatorIds?.length && {
      creatorId: { in: filters.creatorIds },
    }),
    deadline: {
      ...(filters.deadlineFrom && { gte: new Date(filters.deadlineFrom) }),
      ...(filters.deadlineTo && { lte: new Date(filters.deadlineTo) }),
    },
  };
}
