"server only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import {
  UserFiltersForm,
  UserFiltersFormPositionCheckboxGroup,
} from "../UserFiltersForm";

const getPositions = cache(async (workspaceId: number) => {
  return await prisma.position.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export async function UserFiltersFormServerContainer() {
  const positions = await getPositions(1);

  return (
    <UserFiltersForm
      positionCheckboxGroup={
        <UserFiltersFormPositionCheckboxGroup positions={positions} />
      }
    />
  );
}
