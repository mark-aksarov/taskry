import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { Attachment } from "@/generated/prisma";

export const getAttachmentsByTask = cache(
  async (taskId: number): Promise<Attachment[]> => {
    return await prisma.attachment.findMany({
      where: { taskId },
    });
  },
);
