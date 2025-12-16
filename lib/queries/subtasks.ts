import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export type GetSubtasksType = ThenArg<ReturnType<typeof getSubtasks>>;
export const getSubtasks = cache(async (taskId: number) => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return await prisma.subtask.findMany({
    where: { taskId, task: { workspaceId } },
    select: {
      task: {
        select: {
          workspaceId: true,
        },
      },
    },
  });
});
