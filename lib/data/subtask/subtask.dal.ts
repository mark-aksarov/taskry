import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { NotificationType, Prisma } from "@/generated/prisma/client";
import { CreateSubtaskInputDTO, UpdateSubtaskInputDTO } from "./subtask.dto";
import { getNotificationRecipients } from "../notification/notification.dal";

export const createSubtask = async (input: CreateSubtaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        subtask: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create subtask.",
    );
  }

  // Check related resources access
  await checkSubtaskResourcesAccess(workspaceId, input.taskId);

  return prisma.$transaction(async (tx) => {
    // Create subtask within the workspace
    const subtask = await tx.subtask.create({
      data: {
        text: input.text,
        taskId: input.taskId,
        isDone: false,
      },
      select: {
        id: true,
        text: true,
        isDone: true,
        taskId: true,

        task: {
          select: {
            title: true,
          },
        },
      },
    });

    // Send notifications
    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.subtaskAdded,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          taskId: subtask.taskId,
          taskTitle: subtask.task.title,
          subtaskId: subtask.id,
          subtaskText: subtask.text,
          isRead: false,
        })),
      });
    }

    return subtask;
  });
};

export const updateSubtask = async (input: UpdateSubtaskInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permission
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        subtask: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update subtask.",
    );
  }

  return prisma.$transaction(async (tx) => {
    // Update subtask and get new data
    const updatedSubtask = await prisma.subtask.update({
      where: {
        id: input.id,
        task: { workspaceId },
      },
      data: {
        text: input.text ?? Prisma.skip,
        isDone: input.isDone === undefined ? Prisma.skip : input.isDone,
      },
      select: {
        id: true,
        text: true,
        isDone: true,
        taskId: true,

        task: {
          select: {
            title: true,
          },
        },
      },
    });

    // Send notifications using the updated subtask
    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.subtaskChanged,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          taskId: updatedSubtask.taskId,
          taskTitle: updatedSubtask.task.title,
          subtaskId: updatedSubtask.id,
          subtaskText: updatedSubtask.text,
          isRead: false,
        })),
      });
    }

    return updatedSubtask;
  });
};

export const deleteSubtask = async (id: number) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId,
      permission: {
        subtask: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete subtask.",
    );
  }

  return prisma.$transaction(async (tx) => {
    const result = await prisma.subtask.delete({
      where: {
        id,
        task: { workspaceId },
      },
      select: {
        text: true,
        isDone: true,
        taskId: true,

        task: {
          select: {
            title: true,
          },
        },
      },
    });

    // Send batched notifications
    const recipients = await getNotificationRecipients(tx, workspaceId, userId);

    if (recipients.length > 0) {
      await tx.notification.createMany({
        data: recipients.map((user) => ({
          type: NotificationType.subtaskDeleted,
          actorId: userId,
          recipientId: user.id,
          workspaceId,
          taskId: result.taskId,
          taskTitle: result.task.title,
          subtaskText: result.text,
          isRead: false,
        })),
      });
    }

    return result;
  });
};

/**
 * HELPERS
 */

async function checkSubtaskResourcesAccess(
  workspaceId: number,
  taskId: number,
) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      workspaceId,
    },
  });

  if (!task) {
    throw new AccessDeniedError("Task access denied or not found");
  }
}
