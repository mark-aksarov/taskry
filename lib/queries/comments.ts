import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "@/lib/queries/types";

export type GetCommentsType = ThenArg<ReturnType<typeof getComments>>;
export const getComments = cache(
  async ({
    userId,
    taskId,
    projectId,
  }: {
    userId: string;
    taskId?: number;
    projectId?: number;
  }) => {
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
