import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { requireSession } from "../utils/requireSession";
import { CreateProjectCategoryInputDTO } from "./projectCategory.dto";
import { AccessDeniedError } from "../utils/error";
import { getNotificationRecipients } from "../notification/notification.dal";
import { NotificationType } from "@/generated/prisma/enums";

export const getAllProjectCategories = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.projectCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const createProjectCategory = async (
  input: CreateProjectCategoryInputDTO,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permission: {
        company: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create project categories.",
    );
  }

  return prisma.$transaction(async (tx) => {
    const projectCategory = await tx.projectCategory.create({
      data: {
        name: input.name,
        workspaceId,
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.projectCategoryAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          projectCategoryId: projectCategory.id,
          projectCategoryName: projectCategory.name,
          isRead: false,
        })),
      });
    }

    return projectCategory;
  });
};
