import { cache } from "react";
import prisma from "../prisma";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";
import { mapPositionSummaryToDTO } from "../mappers/positions";

export const getPositionSummaries = cache(async () => {
  const session = await getSessionOrThrow();
  const workspaceId = session.user.workspaceId;

  const positions = await prisma.position.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return positions.map(mapPositionSummaryToDTO);
});
