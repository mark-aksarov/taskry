import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { UserPreview } from "./types";

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
