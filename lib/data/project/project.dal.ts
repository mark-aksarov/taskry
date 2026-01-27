import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProjectFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { verifySession } from "../utils/verifySession";
import { CreateProjectInputDTO, UpdateProjectInputDTO } from "./project.dto";
import { Prisma, ProjectStatus, TaskStatus } from "@/generated/prisma/client";

export const getProject = cache(
  async <T extends Prisma.ProjectSelect>(id: number, select: T) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { id, workspaceId };

    return prisma.project.findFirst({
      where,
      select,
    });
  },
);

export const getAllProjects = cache(
  async <T extends Prisma.ProjectSelect>({ select }: { select: T }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { workspaceId };

    return await prisma.project.findMany({
      where,
      select,
    });
  },
);

export const getPaginatedProjects = cache(
  async <T extends Prisma.ProjectSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: ProjectFilters;
    select: T;
  }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize ? pageSize : undefined;

    const orderByMapping: Record<
      string,
      Prisma.ProjectOrderByWithRelationInput
    > = {
      title: { title: "asc" },
      deadline: { deadline: "asc" },
      status: { status: "asc" },
      category: { category: { name: "asc" } },
    };

    const orderBy = sort ? orderByMapping[sort] : undefined;
    const where = buildProjectWhereClause(workspaceId, filters);

    const [items, totalCount] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      prisma.project.count({ where }),
    ]);

    return {
      items,
      totalCount,
    };
  },
);

export const getProjectCount = cache(async (filters?: ProjectFilters) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return prisma.project.count({
    where: buildProjectWhereClause(workspaceId, filters),
  });
});

export const createProject = async (input: CreateProjectInputDTO) => {
  const {
    user: { id: creatorId, workspaceId },
  } = await verifySession();

  await validateRelations(workspaceId, input.categoryId, input.customerId);

  return await prisma.project.create({
    data: {
      ...input,
      creatorId,
      workspaceId,
    },
  });
};

export const updateProject = async (input: UpdateProjectInputDTO) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  await validateRelations(workspaceId, input.categoryId, input.customerId);

  return await prisma.$transaction(async (tx) => {
    await tx.project.update({
      where: {
        id: input.id,
        workspaceId,
      },
      data: input,
    });
  });
};

export const updateProjects = async (ids: number[], status: ProjectStatus) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.$transaction(async (tx) => {
    await tx.project.updateMany({
      where: {
        id: { in: ids },
        workspaceId,
      },
      data: {
        status,
      },
    });
  });
};

export const deleteProjects = async (ids: number[]) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.project.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });
};

/**
 * HELPERS
 */

async function validateRelations(
  workspaceId: number,
  categoryId?: number,
  customerId?: number,
) {
  if (categoryId) {
    const category = await prisma.projectCategory.findFirst({
      where: { id: categoryId, workspaceId },
    });

    if (!category) {
      throw new AccessDeniedError("Category access denied or not found");
    }
  }

  if (customerId) {
    const customer = await prisma.customer.findFirst({
      where: { id: customerId, workspaceId },
    });

    if (!customer) {
      throw new AccessDeniedError("Customer access denied or not found");
    }
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
      OR: [
        { title: { contains: filters.query, mode: "insensitive" as const } },
      ],
    }),

    ...(filters.noActiveTasks && {
      status: ProjectStatus.active,
      tasks: { none: { status: TaskStatus.active } },
    }),
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.customer?.length && { customerId: { in: filters.customer } }),
    ...(filters.user?.length && { creatorId: { in: filters.user } }),
    deadline: {
      ...(filters.deadlineFrom && { gte: filters.deadlineFrom }),
      ...(filters.deadlineTo && { lte: filters.deadlineTo }),
    },
  };
}
