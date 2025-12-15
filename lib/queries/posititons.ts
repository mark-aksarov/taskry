import { cache } from "react";
import prisma from "../prisma";
import { auth } from "../auth";
import { ThenArg } from "./types";
import { headers } from "next/headers";

export type GetPositionSummariesType = ThenArg<
  ReturnType<typeof getPositionSummaries>
>;
export const getPositionSummaries = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const workspaceId = session.user.workspaceId;

  return await prisma.position.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});
