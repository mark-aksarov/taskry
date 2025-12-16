import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "@/lib/queries/types";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export type GetCommentsType = ThenArg<ReturnType<typeof getComments>>;
export const getComments = cache(
  async ({ taskId, projectId }: { taskId?: number; projectId?: number }) => {
    const session = await getSessionOrThrow();

    return await prisma.comment.findMany({
      where: {
        taskId,
        projectId,
        parentId: null,
      },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },
        attachments: {
          select: {
            id: true,
            fileUrl: true,
          },
        },
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });
  },
);
