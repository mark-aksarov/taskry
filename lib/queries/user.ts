import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { UserPreview } from "./types";

export const getUserById = cache(
  async (userId: string): Promise<UserPreview> => {
    return await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
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
  async (workspaceId: number): Promise<UserPreview[]> => {
    return await prisma.user.findMany({
      where: { position: { workspaceId } },
      include: {
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
