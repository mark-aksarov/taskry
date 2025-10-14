import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { Comment } from "@/lib/queries/types";

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
      },
    });
  },
);
