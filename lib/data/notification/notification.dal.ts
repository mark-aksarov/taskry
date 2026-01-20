import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { verifySession } from "@/lib/data/utils/verifySession";
import { Prisma, NotificationType } from "@/generated/prisma/client";

export const getAllNotifications = cache(
  async ({
    page,
    pageSize,
    filter,
  }: {
    page: number;
    pageSize: number;
    filter?: "unread" | "all";
  }) => {
    const {
      user: { workspaceId, id: recipientId },
    } = await verifySession();

    const skip = (page - 1) * pageSize;
    const baseWhere = { recipientId, workspaceId };

    const listWhere = {
      ...baseWhere,
      ...(filter === "unread" && { isRead: false }),
    };

    const [notifications, totalCount, unreadCount] = await prisma.$transaction([
      prisma.notification.findMany({
        where: listWhere,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          type: true,
          createdAt: true,
          isRead: true,

          projectTitle: true,
          taskTitle: true,
          commentContent: true,
          userFullName: true,
          customerFullName: true,

          actor: {
            select: {
              id: true,
              fullName: true,
              imageUrl: true,
            },
          },

          project: {
            select: {
              id: true,
              title: true,
            },
          },

          task: {
            select: {
              id: true,
              title: true,
            },
          },

          user: {
            select: {
              id: true,
              fullName: true,
            },
          },

          customer: {
            select: {
              id: true,
              fullName: true,
            },
          },

          comment: {
            select: {
              id: true,
              content: true,
            },
          },
        },
      }),

      prisma.notification.count({ where: baseWhere }),
      prisma.notification.count({ where: { ...baseWhere, isRead: false } }),
    ]);

    return { items: notifications, totalCount, unreadCount };
  },
);

export const deleteNotification = async (id: number) => {
  // Authorization
  const {
    user: { id: recipientId, workspaceId },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: recipientId,
      permission: {
        notification: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete notifications.",
    );
  }

  return await prisma.notification.delete({
    where: {
      workspaceId,
      id,
      recipientId,
    },
  });
};

export const markNotificationsAsRead = async (ids: number[] | null) => {
  // Authorization
  const {
    user: { id: recipientId, workspaceId },
  } = await verifySession();

  // ACL
  const permission = await auth.api.userHasPermission({
    body: {
      userId: recipientId,
      permission: {
        notification: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to mark notifications as read.",
    );
  }

  const result = await prisma.notification.updateMany({
    where: {
      ...(ids ? { id: { in: ids } } : {}),
      workspaceId,
      recipientId,
    },
    data: {
      isRead: true,
    },
  });

  return result;
};

/**
 * Send notifications
 */

export async function createCommentAddedNotifications(
  tx: Prisma.TransactionClient,
  {
    comment,
    taskTitle,
    projectTitle,
    actorId,
    workspaceId,
  }: {
    comment: {
      id: number;
      content: string;
      taskId?: number | null;
      projectId?: number | null;
    };
    taskTitle?: string;
    projectTitle?: string;
    actorId: string;
    workspaceId: number;
  },
) {
  const recipients = await getNotificationRecipients(tx, workspaceId, actorId);

  if (recipients.length === 0) return;

  await tx.notification.createMany({
    data: recipients.map((user) => ({
      type: "commentAdded",
      actorId,
      recipientId: user.id,
      workspaceId,
      commentId: comment.id,
      taskId: comment.taskId,
      projectId: comment.projectId,
      commentContent: comment.content.substring(0, 250),
      taskTitle: taskTitle,
      projectTitle: projectTitle,
      isRead: false,
    })),
  });
}

export async function createCommentDeletedNotifications(
  tx: Prisma.TransactionClient,
  {
    comment,
    taskTitle,
    projectTitle,
    actorId,
    workspaceId,
  }: {
    comment: {
      content: string;
      taskId?: number | null;
      projectId?: number | null;
    };
    taskTitle?: string;
    projectTitle?: string;
    actorId: string;
    workspaceId: number;
  },
) {
  const recipients = await getNotificationRecipients(tx, workspaceId, actorId);

  if (recipients.length === 0) return;

  await tx.notification.createMany({
    data: recipients.map((user) => ({
      type: "commentDeleted",
      actorId,
      recipientId: user.id,
      workspaceId,
      taskId: comment.taskId,
      projectId: comment.projectId,
      commentContent: comment.content.substring(0, 250),
      taskTitle: taskTitle,
      projectTitle: projectTitle,
      isRead: false,
    })),
  });
}

/**
 * Task Notifications
 */

export async function createTaskAddedNotifications(
  tx: Prisma.TransactionClient,
  {
    task,
    actorId,
    workspaceId,
  }: {
    task: {
      id: number;
      title: string;
    };
    actorId: string;
    workspaceId: number;
  },
) {
  const recipients = await getNotificationRecipients(tx, workspaceId, actorId);

  if (recipients.length === 0) return;

  await tx.notification.createMany({
    data: recipients.map((user) => ({
      type: NotificationType.taskAdded,
      actorId,
      recipientId: user.id,
      workspaceId,
      taskId: task.id,
      taskTitle: task.title,
      isRead: false,
    })),
  });
}

export async function createTaskDeletedNotifications(
  tx: Prisma.TransactionClient,
  {
    tasks,
    actorId,
    workspaceId,
  }: {
    tasks: {
      title: string;
    }[];
    actorId: string;
    workspaceId: number;
  },
) {
  const recipients = await getNotificationRecipients(tx, workspaceId, actorId);

  if (recipients.length === 0) return;

  await tx.notification.createMany({
    data: tasks.flatMap((task) =>
      recipients.map((user) => ({
        type: NotificationType.taskDeleted,
        actorId,
        recipientId: user.id,
        workspaceId,
        taskTitle: task.title,
        isRead: false,
      })),
    ),
  });
}

export async function createTaskChangedNotifications(
  tx: Prisma.TransactionClient,
  {
    tasks,
    actorId,
    workspaceId,
  }: {
    tasks: {
      id: number;
      title: string;
    }[];
    actorId: string;
    workspaceId: number;
  },
) {
  const recipients = await getNotificationRecipients(tx, workspaceId, actorId);

  if (recipients.length === 0) return;

  await tx.notification.createMany({
    data: tasks.flatMap((task) =>
      recipients.map((user) => ({
        type: NotificationType.taskChanged,
        actorId,
        recipientId: user.id,
        workspaceId,
        taskId: task.id,
        taskTitle: task.title,
        isRead: false,
      })),
    ),
  });
}

/**
 * HELPER
 */

async function getNotificationRecipients(
  tx: Prisma.TransactionClient,
  workspaceId: number,
  actorId: string,
) {
  return tx.user.findMany({
    where: {
      workspaceId,
      id: { not: actorId },
    },
    select: { id: true },
  });
}
