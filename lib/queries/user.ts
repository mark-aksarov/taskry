import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { UserItem, UserDetail } from "@/components/users/types";

export const getUserById = cache(
  async (userId: string): Promise<UserDetail> => {
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
  },
);

export const getUsers = cache(
  async (workspaceId: number): Promise<UserItem[]> => {
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
  },
);

export const getPositions = cache(async (workspaceId: number) => {
  return await prisma.position.findMany({
    where: { workspaceId },
  });
});

export const getTotalUsers = cache(async () => {
  return prisma.user.count();
});
