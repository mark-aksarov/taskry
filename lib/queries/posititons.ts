import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";

export type GetPositionSummariesType = ThenArg<
  ReturnType<typeof getPositionSummaries>
>;
export const getPositionSummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  return await prisma.position.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});
