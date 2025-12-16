import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export type GetCompanySummariesType = ThenArg<
  ReturnType<typeof getCompanySummaries>
>;
export const getCompanySummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

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
