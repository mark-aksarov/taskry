import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { NotificationType } from "@/generated/prisma/enums";
import { CreateTaskCategoryInputDTO } from "./taskCategory.dto";
import { getNotificationRecipients } from "../notification/notification.dal";

export const getAllTaskCategories = cache(async () => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return await prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });
});

export const createTaskCategory = async (input: CreateTaskCategoryInputDTO) => {
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
      "You do not have permission to create task categories.",
    );
  }

  return prisma.$transaction(async (tx) => {
    const taskCategory = await tx.taskCategory.create({
      data: {
        name: input.name,
        workspaceId,
      },
    });

    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.taskCategoryAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          taskCategoryId: taskCategory.id,
          taskCategoryName: taskCategory.name,
          isRead: false,
        })),
      });
    }

    return taskCategory;
  });
};
