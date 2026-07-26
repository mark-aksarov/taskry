import "server-only";

import {
  PositionDTO,
  CreatePositionInputDTO,
  UpdatePositionInputDTO,
} from "./position.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { Position } from "@/generated/prisma/client";
import { validatePositionLimit } from "../utils/validation";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";

export const getPositionCount = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  return prisma.position.count({ where: { organizationId } });
});

export const getPositions = cache(async () => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const positions = await prisma.position.findMany({
    where: { organizationId },
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // ACL
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        position: ["create"],
      },
    },
  });
  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create positions.",
    );
  }

  // Validate limit
  await validatePositionLimit(organizationId, input.length);

  // Create positions
  const positions = await prisma.position.createManyAndReturn({
    data: input.map((position) => ({
      name: position.name,
      organizationId,
    })),
  });

  return positions.map(mapToPositionDTO);
};

export const updatePosition = async (input: UpdatePositionInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        position: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update positions.",
    );
  }

  // Update position
  const updatedPosition = await prisma.position.update({
    where: {
      id: input.id,
      organizationId,
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permissions
  const permissions = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        position: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete positions.",
    );
  }

  // Bulk delete positions within the workspace
  const result = await prisma.position.deleteMany({
    where: {
      organizationId,
      id: { in: ids },
    },
  });

  return result;
};

/**
 * Helpers
 */

export function mapToPositionDTO(
  position: Pick<Position, "id" | "name">,
): PositionDTO {
  return {
    id: position.id,
    name: position.name,
  };
}
