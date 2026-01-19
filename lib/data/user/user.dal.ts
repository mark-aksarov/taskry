import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserFilters } from "@/lib/types";
import { verifySession } from "../utils/verifySession";
import { Prisma, TaskStatus } from "@/generated/prisma/client";

export const getUser = cache(
  async <T extends Prisma.UserSelect>(id: string, select: T) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { id, workspaceId };

    return prisma.user.findFirst({
      where,
      select,
    });
  },
);

export const getAllUsers = cache(
  async <T extends Prisma.UserSelect>({ select }: { select: T }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    let where = { workspaceId };

    return await prisma.user.findMany({
      where,
      select,
    });
  },
);

export const getPaginatedUsers = cache(
  async <T extends Prisma.UserSelect>({
    page,
    pageSize,
    sort,
    filters,
    select,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: UserFilters;
    select: T;
  }) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize ? pageSize : undefined;

    const orderByMapping: Record<string, Prisma.UserOrderByWithRelationInput> =
      {
        fullName: { fullName: "asc" },
        position: { position: { name: "asc" } },
      };

    const orderBy = sort ? orderByMapping[sort] : undefined;
    const where = buildUserWhereClause(workspaceId, filters);

    const [items, totalCount] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      prisma.user.count({ where }),
    ]);

    return {
      items,
      totalCount,
    };
  },
);

export const getUserCount = cache(async (filters?: UserFilters) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return prisma.user.count({
    where: buildUserWhereClause(workspaceId, filters),
  });
});

export const deleteUsers = async (ids: string[]) => {
  const {
    user: { workspaceId },
  } = await verifySession();

  return await prisma.user.deleteMany({
    where: { workspaceId, id: { in: ids } },
  });
};

/**
 * HELPERS
 */

export function buildUserWhereClause(
  workspaceId: number,
  filters?: UserFilters,
): Prisma.UserWhereInput {
  if (!filters) return { workspaceId };

  return {
    workspaceId,

    ...(filters.query && {
      OR: [
        { fullName: { contains: filters.query, mode: "insensitive" as const } },
      ],
    }),

    ...(filters.hasNoActiveTasks && {
      assignedTasks: { none: { status: TaskStatus.active } },
    }),

    ...(filters.hasActiveTasks && {
      assignedTasks: { some: { status: TaskStatus.active } },
    }),

    ...(filters.hasOverdueTasks && {
      assignedTasks: {
        some: {
          status: { not: TaskStatus.completed },
          deadline: { lt: new Date() },
        },
      },
    }),

    ...(filters.position?.length && { positionId: { in: filters.position } }),
  };
}
