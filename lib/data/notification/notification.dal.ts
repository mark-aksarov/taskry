import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { getSessionOrThrow } from "@/lib/utils/getSessionOrThrow";
import { notificationListItemSelect } from "./notification.select";
import { mapNotificationListItemToDTO } from "./notification.mapper";

export const getNotificationsList = cache(
  async ({
    page,
    pageSize,
    filter,
  }: {
    page: number;
    pageSize: number;
    filter?: string;
  }) => {
    const {
      user: { workspaceId, id: recipientId },
    } = await getSessionOrThrow();

    const skip = (page - 1) * pageSize;
    const where: any = {
      recipientId,
      workspaceId,
    };

    if (filter === "unread") where.isRead = false;

    const notifications = await prisma.notification.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },

      select: notificationListItemSelect,
    });

    return notifications.map(mapNotificationListItemToDTO);
  },
);

export const getNotificationsCount = cache(
  async ({ isRead }: { isRead?: boolean } = {}) => {
    const session = await getSessionOrThrow();
    const recipientId = session.user.id;
    const workspaceId = session.user.workspaceId;

    const where = {
      recipientId,
      workspaceId,
      ...(isRead !== undefined && { isRead }),
    };

    return prisma.notification.count({ where });
  },
);
