"server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProjectFilters } from "@/lib/types";
import { AccessDeniedError } from "../utils/error";
import { buildDateWhere } from "../utils/dateWhere";
import { verifySession } from "../utils/verifySession";
import { TRANSITION_TASK_STATUSES_BY_PROJECT } from "../utils/statusUtils";
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

    return await prisma.project.findMany({
      where: buildProjectWhereClause(workspaceId, filters),
      orderBy,
      skip,
      take,
      select,
    });
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

    if (input.status) {
      await applyProjectStatusTaskTransitions(tx, [input.id], input.status);
    }
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

    await applyProjectStatusTaskTransitions(tx, ids, status);
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

const applyProjectStatusTaskTransitions = async (
  tx: Prisma.TransactionClient,
  projectIds: number[],
  nextStatus: ProjectStatus,
) => {
  const taskRules = TRANSITION_TASK_STATUSES_BY_PROJECT[nextStatus];
  if (!taskRules) return;

  for (const [current, target] of Object.entries(taskRules)) {
    if (current === target) continue;

    await tx.task.updateMany({
      where: {
        projectId: { in: projectIds },
        status: current as TaskStatus,
      },
      data: {
        status: target as TaskStatus,
      },
    });
  }
};

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

  const datesWhere = buildDateWhere({
    quick: filters.deadline as any,
    dateStart: filters.dateStart,
    dateEnd: filters.dateEnd,
  });

  return {
    workspaceId,
    ...(filters.noActiveTasks && {
      tasks: { none: { status: ProjectStatus.active } },
    }),
    ...(filters.status?.length && { status: { in: filters.status } }),
    ...(filters.category?.length && { categoryId: { in: filters.category } }),
    ...(filters.customer?.length && { customerId: { in: filters.customer } }),
    ...(filters.user?.length && { creatorId: { in: filters.user } }),
    ...(datesWhere && { deadline: datesWhere }),
  };
}
