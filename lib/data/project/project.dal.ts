import "server-only";

import {
  Prisma,
  Project,
  TaskStatus,
  ProjectStatus,
} from "@/generated/prisma/client";

import {
  ProjectDTO,
  ProjectListDTO,
  ProjectDetailDTO,
  ProjectSummaryDTO,
  UpdateProjectInputDTO,
  CreateProjectInputDTO,
} from "./project.dto";

import {
  validateClients,
  validateProjectCategories,
  validateProjectLimit,
} from "../utils/validation";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { uniqueDefinedIds } from "../utils/uniqueDefinedIds";
import { ProjectFilters, ProjectSortField } from "@/lib/types";
import { verifyResourceAccess } from "../utils/verifyResourceAccess";

export const getProjectDetail = cache(
  async (id: number): Promise<ProjectDetailDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await verifyResourceAccess();

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, organizationId },
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

        client: {
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

        tasks: {
          select: {
            status: true,
          },
        },
      },
    });

    if (!project) {
      return null;
    }

    const totalTasks = project.tasks.length;
    const activeTasks = project.tasks.filter(
      (t) => t.status === "active",
    ).length;
    const pendingTasks = project.tasks.filter(
      (t) => t.status === "pending",
    ).length;
    const completedTasks = project.tasks.filter(
      (t) => t.status === "completed",
    ).length;

    // Map to DTO
    return {
      id: project.id,
      title: project.title,
      description: project.description ?? undefined,
      deadline: project.deadline.toISOString(),
      status: project.status,
      categoryId: project.category?.id,
      clientId: project.client?.id,
      creator: project.creator
        ? {
            id: project.creator.id,
            fullName: project.creator.fullName,
            imageUrl: project.creator.imageUrl ?? undefined,
          }
        : undefined,
      client: project.client
        ? {
            id: project.client.id,
            fullName: project.client.fullName,
          }
        : undefined,
      category: project.category ?? undefined,
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        active: activeTasks,
        pending: pendingTasks,
      },
    };
  },
);

export const getProject = cache(
  async (id: number): Promise<ProjectDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await verifyResourceAccess();

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, organizationId },
      select: {
        id: true,
        title: true,
        description: true,
        deadline: true,
        status: true,
        categoryId: true,
        clientId: true,
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
      clientId: project.clientId ?? undefined,
    };
  },
);

export const getProjects = cache(async (): Promise<ProjectDTO[]> => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  const projects = await prisma.project.findMany({
    where: { organizationId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,
      status: true,
      categoryId: true,
      clientId: true,
    },
  });

  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description ?? undefined,
    deadline: project.deadline.toISOString(),
    status: project.status,
    categoryId: project.categoryId ?? undefined,
    clientId: project.clientId ?? undefined,
  }));
});

export const getProjectSummary = cache(
  async (id: number): Promise<ProjectSummaryDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await verifyResourceAccess();

    // Get project
    const project = await prisma.project.findFirst({
      where: { id, organizationId },
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
      session: { activeOrganizationId: organizationId },
    } = await verifyResourceAccess();

    const where = { organizationId };

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
      session: { activeOrganizationId: organizationId },
    } = await verifyResourceAccess();

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

    const where = buildProjectWhereClause(organizationId, filters);

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
          client: {
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
          (t) => t.status === "completed",
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
          client: p.client
            ? {
                id: p.client.id,
                fullName: p.client.fullName,
                imageUrl: p.client.imageUrl ?? undefined,
              }
            : undefined,
          company: p.client?.company
            ? {
                id: p.client.company.id,
                name: p.client.company.name,
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
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  return prisma.project.count({
    where: buildProjectWhereClause(organizationId, filters),
  });
});

export const createProjects = async (input: CreateProjectInputDTO[]) => {
  // Authorization
  const {
    user: { id: userId },
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permission
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create projects.",
    );
  }

  // Validate limit
  await validateProjectLimit(organizationId, input.length);

  // Validate categories
  const categoryIds = uniqueDefinedIds(
    input.map((project) => project.categoryId),
  );

  if (categoryIds.length > 0) {
    await validateProjectCategories(organizationId, categoryIds);
  }

  // Validate clients
  const clientIds = uniqueDefinedIds(input.map((project) => project.clientId));

  if (clientIds.length > 0) {
    await validateClients(organizationId, clientIds);
  }

  const projects = await prisma.project.createManyAndReturn({
    data: input.map((project) => ({
      title: project.title,
      description: project.description,
      deadline: new Date(project.deadline),
      clientId: project.clientId,
      categoryId: project.categoryId,
      status: project.status,
      creatorId: userId,
      organizationId,
    })),
  });

  return projects.map(mapToProjectDTO);
};

export const updateProject = async (input: UpdateProjectInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project.",
    );
  }

  // Validate category
  if (input.categoryId) {
    await validateProjectCategories(organizationId, [input.categoryId]);
  }

  // Validate client
  if (input.clientId) {
    await validateClients(organizationId, [input.clientId]);
  }

  // Update project
  const updatedProject = await prisma.project.update({
    where: {
      id: input.id,
      organizationId,
    },
    data: {
      title: input.title,
      description: input.description,
      deadline: input.deadline ? new Date(input.deadline) : undefined,
      clientId: input.clientId,
      categoryId: input.categoryId,
      status: input.status,
    },
  });

  return mapToProjectDTO(updatedProject);
};

export const updateProjectStatuses = async (
  ids: number[],
  status: ProjectStatus,
) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update project.",
    );
  }

  // Update projects

  const updatedProjects = await prisma.project.updateManyAndReturn({
    where: {
      id: { in: ids },
      organizationId,
    },
    data: {
      status,
    },
  });

  return updatedProjects.map(mapToProjectDTO);
};

export const deleteProjects = async (ids: number[]) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await verifyResourceAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError("You do not have permission to delete tasks.");
  }

  // Bulk delete projects
  const deletedProjects = await prisma.project.deleteMany({
    where: {
      organizationId,
      id: { in: ids },
    },
  });

  return deletedProjects;
};

/**
 * HELPERS
 */

export function buildProjectWhereClause(
  organizationId: string,
  filters?: ProjectFilters,
): Prisma.ProjectWhereInput {
  if (!filters) return { organizationId };

  return {
    organizationId,

    ...(filters.query && {
      title: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters.noActiveTasks && {
      tasks: { none: { status: TaskStatus.active } },
    }),
    ...(filters.statuses?.length && { status: { in: filters.statuses } }),
    ...(filters.categoryIds?.length && {
      categoryId: { in: filters.categoryIds },
    }),
    ...(filters.clientIds?.length && {
      clientId: { in: filters.clientIds },
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

/**
 * Helpers
 */

export function mapToProjectDTO(
  position: Pick<
    Project,
    | "id"
    | "title"
    | "description"
    | "deadline"
    | "status"
    | "categoryId"
    | "clientId"
  >,
): ProjectDTO {
  return {
    id: position.id,
    title: position.title,
    description: position.description ?? undefined,
    deadline: position.deadline.toISOString(),
    status: position.status,
    categoryId: position.categoryId ?? undefined,
    clientId: position.clientId ?? undefined,
  };
}
