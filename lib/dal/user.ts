import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";
import { mapUserListItemToDTO, mapUserSummaryToDTO } from "../mappers/user";

export const getUserSummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const users = await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });

  return users.map(mapUserSummaryToDTO);
});

export const getUserDetails = cache(async (userId: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      imageUrl: true,
      publicLink: true,
      birthdate: true,
      bio: true,
      address: true,

      position: {
        select: {
          name: true,
          workspaceId: true,
        },
      },
    },
  });
});

function getUserWhereClause(params: { workspaceId: number }) {
  const { workspaceId } = params;

  return {
    position: {
      workspaceId,
    },
  };
}

export const getUserList = cache(
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;

    const where = getUserWhereClause({ workspaceId });
    const skip = (page - 1) * pageSize;

    const users = await prisma.user.findMany({
      where,
      skip,
      take: pageSize,

      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        imageUrl: true,
        publicLink: true,

        position: {
          select: {
            name: true,
          },
        },
      },
    });

    return users.map(mapUserListItemToDTO);
  },
);

export const getUserCount = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;
  const where = getUserWhereClause({ workspaceId });

  return prisma.user.count({ where });
});
