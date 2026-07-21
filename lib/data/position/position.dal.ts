import "server-only";

import {
  mapToPositionDTO,
  CreatePositionInputDTO,
  UpdatePositionInputDTO,
} from "./position.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { validatePositionLimit } from "../utils/validation";

export const getPositionCount = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.position.count({ where: { workspaceId } });
});

export const getPositions = cache(async () => {
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
    orderBy: {
      createdAt: "desc",
    },
  });

  return positions.map(mapToPositionDTO);
});

export const createPositions = async (input: CreatePositionInputDTO[]) => {
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

  // Validate limit
  await validatePositionLimit(workspaceId, input.length);

  // Create positions
  const positions = await prisma.position.createManyAndReturn({
    data: input.map((position) => ({
      name: position.name,
      workspaceId,
    })),
  });

  return positions.map(mapToPositionDTO);
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

  return mapToPositionDTO(updatedPosition);
};

export const deletePositions = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        position: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete positions.",
    );
  }

  // Bulk delete positions within the workspace
  const result = await prisma.position.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return result;
};
