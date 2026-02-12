import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import {
  CreatePositionInputDTO,
  PositionSummaryDTO,
  UpdatePositionInputDTO,
} from "./position.dto";

export const getPositionCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.position.count({ where: { workspaceId } });
});

export const getPositionSummaries = cache(
  async (): Promise<PositionSummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const positions = await prisma.position.findMany({
      where: { workspaceId },
      select: {
        id: true,
        name: true,
      },
    });

    return positions;
  },
);

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

export const updatePosition = async (input: UpdatePositionInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        position: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update positions.",
    );
  }

  // Update position
  const updatedPosition = await prisma.position.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      name: input.name,
    },
  });

  return updatedPosition;
};
