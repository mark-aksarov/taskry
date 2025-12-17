import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { Attachment } from "@/generated/prisma/client";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export const getAttachmentsByTask = cache(
  async (taskId: number): Promise<Attachment[]> => {
    const session = await getSessionOrThrow();
    const workspaceId = session.user.workspaceId;

    return await prisma.attachment.findMany({
      where: { taskId, workspaceId },
    });
  },
);
