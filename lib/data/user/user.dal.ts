import "server-only";

import {
  mapUserDetailToDTO,
  mapUserSummaryToDTO,
  mapUserListItemToDTO,
} from "./user.mapper";

import {
  userDetailSelect,
  userSummarySelect,
  userListItemSelect,
} from "./user.select";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { Prisma, TaskStatus } from "@/generated/prisma/client";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";
import { UserFilters } from "./user.dto";

export const getUserSummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const users = await prisma.user.findMany({
    where: { workspaceId },
    select: userSummarySelect,
  });

  return users.map(mapUserSummaryToDTO);
});

export const getUserDetail = cache(async (userId: string) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const data = await prisma.user.findFirst({
    where: { id: userId, workspaceId },
    select: userDetailSelect,
  });

  if (!data) throw new Error("User not found");

  return mapUserDetailToDTO(data);
});

export const getUserList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page: number;
    pageSize: number;
    sort: string;
    filters?: UserFilters;
  }) => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const skip = (page - 1) * pageSize;

    const orderByMapping: Record<string, Prisma.UserOrderByWithRelationInput> =
      {
        fullName: { fullName: "asc" },
        position: { position: { name: "asc" } },
      };

    const users = await prisma.user.findMany({
      where: buildUserWhereClause(workspaceId, filters),
      orderBy: [orderByMapping[sort] || { fullName: "asc" }],
      skip,
      take: pageSize,
      select: userListItemSelect,
    });

    return users.map(mapUserListItemToDTO);
  },
);

export const getUserCount = cache(async (filters?: UserFilters) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return prisma.user.count({
    where: buildUserWhereClause(workspaceId, filters),
  });
});

export const deleteUsers = async (ids: string[]) => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const { count } = await prisma.user.deleteMany({
    where: { workspaceId, id: { in: ids } },
  });

  if (count === 0) throw new Error("No users deleted.");

  return count;
};

export function buildUserWhereClause(
  workspaceId: number,
  filters?: UserFilters,
): Prisma.UserWhereInput {
  if (!filters) return { workspaceId };

  return {
    workspaceId,
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
