import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifySession } from "../utils/verifySession";

export const getAllComments = cache(
  async (taskId?: number, projectId?: number) => {
    const {
      user: { workspaceId },
    } = await verifySession();

    return await prisma.comment.findMany({
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
  },
);
