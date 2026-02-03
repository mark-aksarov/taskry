import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { CreatePositionInputDTO } from "./position.dto";
import { requireSession } from "../utils/requireSession";

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

export const createPosition = async (input: CreatePositionInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        position: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create positions.",
    );
  }

  // Create position
  const position = await prisma.position.create({
    data: {
      name: input.name,
      workspaceId,
    },
  });

  return position;
};
