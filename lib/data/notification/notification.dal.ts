import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { AccessDeniedError } from "../utils/error";
import { Prisma } from "@/generated/prisma/client";
import { requireSession } from "@/lib/data/utils/requireSession";

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
    } = await requireSession();

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
          companyName: true,
          positionName: true,
          taskCategoryName: true,
          projectCategoryName: true,
          subtaskText: true,

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

          company: {
            select: {
              id: true,
              name: true,
            },
          },

          position: {
            select: {
              id: true,
              name: true,
            },
          },

          taskCategory: {
            select: {
              id: true,
              name: true,
            },
          },

          projectCategory: {
            select: {
              id: true,
              name: true,
            },
          },

          subtask: {
            select: {
              id: true,
              text: true,
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
  } = await requireSession();

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
  } = await requireSession();

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
 * HELPER
 */

export async function getNotificationRecipients(
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
