import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "@/lib/queries/types";

export type GetCommentsByTaskType = ThenArg<
  ReturnType<typeof getCommentsByTask>
>;
export const getCommentsByTask = cache(
  async (taskId: number, userId: string) => {
    return await prisma.comment.findMany({
      where: {
        taskId,
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
            likes: true,
            replies: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            userId: true,
          },
        },
      },
    });
  },
);
