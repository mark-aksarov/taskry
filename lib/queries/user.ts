import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetUserByIdType = ThenArg<ReturnType<typeof getUserById>>;
export const getUserById = cache(async (userId: string) => {
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

export type GetUsersType = ThenArg<ReturnType<typeof getUsers>>;
export const getUsers = cache(async (workspaceId: number) => {
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
