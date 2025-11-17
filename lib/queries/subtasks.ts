import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetSubtasksType = ThenArg<ReturnType<typeof getSubtasks>>;
export const getSubtasks = cache(async (taskId: number) => {
  return await prisma.subtask.findMany({
    where: { taskId },
  });
});
