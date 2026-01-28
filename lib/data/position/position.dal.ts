import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { requireSession } from "../utils/requireSession";
import { CreatePositionInputDTO } from "./position.dto";

export const getAllPositions = cache(async () => {
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.position.findMany({
    where: { workspaceId },
    select: {
      id: true,
      name: true,
    },
  });
});

export const createPosition = async (position: CreatePositionInputDTO) => {
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.position.create({
    data: {
      ...position,
      workspaceId,
    },
  });
};
