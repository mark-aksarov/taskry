import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { commentSelect } from "./comment.select";
import { mapCommentToDTO } from "./comment.mapper";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

export const getComments = cache(
  async ({ taskId, projectId }: { taskId?: number; projectId?: number }) => {
    const {
      user: { workspaceId },
    } = await getSessionOrThrow();

    const comments = await prisma.comment.findMany({
      where: {
        taskId,
        projectId,
        workspaceId,
        parentId: null,
      },
      select: commentSelect,
    });

    return comments.map((comment) => mapCommentToDTO(comment));
  },
);
