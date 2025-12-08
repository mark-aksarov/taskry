import "server-only";

import { cache } from "react";
import prisma from "../prisma";

export const getWorkspaceIdByUserId = cache(
  async (userId: string): Promise<number> => {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        position: {
          select: {
            workspaceId: true,
          },
        },
      },
    });

    if (!user.position?.workspaceId) {
      throw new Error(`User ${userId} has no workspace assigned`);
    }

    return user.position.workspaceId;
  },
);
