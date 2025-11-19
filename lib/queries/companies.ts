import { cache } from "react";
import { ThenArg } from "./types";
import prisma from "../prisma";

export type GetCompanySummariesType = ThenArg<
  ReturnType<typeof getCompanySummaries>
>;
export const getCompanySummaries = cache(async (workspaceId: number) => {
  return await prisma.company.findMany({
    where: {
      workspaceId,
    },
    select: {
      id: true,
      name: true,
    },
  });
});
