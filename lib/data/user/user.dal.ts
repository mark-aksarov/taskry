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
import { Prisma } from "@/generated/prisma/client";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

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
  }: {
    page: number;
    pageSize: number;
    sort: string;
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
      where: { workspaceId },
      orderBy: [orderByMapping[sort] || { fullName: "asc" }],
      skip,
      take: pageSize,
      select: userListItemSelect,
    });

    return users.map(mapUserListItemToDTO);
  },
);

export const getUserCount = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  return prisma.user.count({
    where: { workspaceId },
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
