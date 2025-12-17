import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { mapCommentToDTO } from "../mappers/comments";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export const getComments = cache(
  async ({ taskId, projectId }: { taskId?: number; projectId?: number }) => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;

    const comments = await prisma.comment.findMany({
      where: {
        taskId,
        projectId,
        workspaceId,
        parentId: null,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,

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

    return comments.map((comment) => mapCommentToDTO(comment));
  },
);
