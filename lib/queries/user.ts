import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

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

export type GetUserListType = ThenArg<ReturnType<typeof getUserList>>;
export const getUserList = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
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
});

export type GeUserSummariesType = ThenArg<ReturnType<typeof getUserSummaries>>;
export const getUserSummaries = cache(async (workspaceId: number) => {
  return await prisma.user.findMany({
    where: { position: { workspaceId } },
    select: { id: true, fullName: true },
  });
});
