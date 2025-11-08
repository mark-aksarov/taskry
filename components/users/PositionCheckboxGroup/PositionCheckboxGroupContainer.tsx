import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { PositionCheckboxGroup } from "./PositionCheckboxGroup";

const getPositions = cache(async (workspaceId: number) => {
  return await prisma.position.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export async function PositionCheckboxGroupContainer() {
  const positions = await getPositions(1);

  if (!positions.length) {
    return null;
  }

  return <PositionCheckboxGroup positions={positions} />;
}
