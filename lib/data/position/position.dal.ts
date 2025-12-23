"server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { positionSummarySelect } from "./position.select";
import { mapPositionSummaryToDTO } from "./position.mapper";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

export const getPositionSummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const positions = await prisma.position.findMany({
    where: { workspaceId },
    select: positionSummarySelect,
  });

  return positions.map(mapPositionSummaryToDTO);
});
