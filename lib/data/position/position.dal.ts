import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { requireSession } from "../utils/requireSession";
import { CreatePositionInputDTO } from "./position.dto";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { getNotificationRecipients } from "../notification/notification.dal";
import { NotificationType } from "@/generated/prisma/enums";

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

  return prisma.$transaction(async (tx) => {
    const position = await tx.position.create({
      data: {
        name: input.name,
        workspaceId,
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.positionAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          positionId: position.id,
          positionName: position.name,
          isRead: false,
        })),
      });
    }

    return position;
  });
};
