import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetPositionSummariesType = ThenArg<
  ReturnType<typeof getPositionSummaries>
>;
export const getPositionSummaries = cache(async (workspaceId: number) => {
  return await prisma.position.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});
