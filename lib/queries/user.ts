import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";
import { auth } from "../auth";
import { headers } from "next/headers";

export type GetUserDetailsType = ThenArg<ReturnType<typeof getUserDetails>>;
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

export type GetUserListType = ThenArg<ReturnType<typeof getUserList>>;
export const getUserList = cache(
  async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const workspaceId = session.user.workspaceId;

    const where = getUserWhereClause({ workspaceId });
    const skip = (page - 1) * pageSize;

    return await prisma.user.findMany({
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
            workspaceId: true,
          },
        },
      },
    });
  },
);

export const getUserCount = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const workspaceId = session.user.workspaceId;

  const where = getUserWhereClause({ workspaceId });

  return prisma.user.count({ where });
});

export type GeUserSummariesType = ThenArg<ReturnType<typeof getUserSummaries>>;
export const getUserSummaries = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const workspaceId = session.user.workspaceId;

  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});
