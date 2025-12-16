import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "@/lib/data/types";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export type GetCommentsType = ThenArg<ReturnType<typeof getComments>>;
export const getComments = cache(
  async ({ taskId, projectId }: { taskId?: number; projectId?: number }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;

    return await prisma.comment.findMany({
      where: {
        taskId,
        projectId,
        workspaceId,
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
