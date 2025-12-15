import { cache } from "react";
import prisma from "../prisma";
import { auth } from "../auth";
import { ThenArg } from "./types";
import { headers } from "next/headers";

export type GetCompanySummariesType = ThenArg<
  ReturnType<typeof getCompanySummaries>
>;
export const getCompanySummaries = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

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
