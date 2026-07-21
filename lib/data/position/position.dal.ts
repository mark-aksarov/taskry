import "server-only";

import {
  PositionSummaryDTO,
  CreatePositionInputDTO,
  UpdatePositionInputDTO,
} from "./position.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError, LimitExceededError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { POSITION_MAX_COUNT } from "../constants";

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return positions;
  },
);

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

  return positions;
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
  const deletedPositions = await prisma.position.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return deletedPositions;
};

/**
 * HELPERS
 */

// Validate that position limit has not been reached
async function validatePositionLimit(
  workspaceId: number,
  newPositionsCount: number,
) {
  const existingCount = await prisma.position.count({
    where: {
      workspaceId,
    },
  });

  if (existingCount + newPositionsCount > POSITION_MAX_COUNT) {
    throw new LimitExceededError(
      `You cannot create more than ${POSITION_MAX_COUNT} positions.`,
    );
  }
}
