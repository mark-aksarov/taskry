import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { Comment, CommentWithReplies } from "@/lib/queries/types";

export const getCommentsByTask = cache(
  async (taskId: number, userId: string): Promise<Comment[]> => {
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

export const getCommentsByUser = cache(
  async (userId: string): Promise<Comment[]> => {
    return await prisma.comment.findMany({
      where: {
        senderId: userId,
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

export const getCommentWithReplies = cache(
  async (id: number, userId: string): Promise<CommentWithReplies> => {
    return await prisma.comment.findFirstOrThrow({
      where: { id },
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
          where: { userId: userId },
          select: { userId: true },
        },
        replies: {
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
        },
      },
    });
  },
);
