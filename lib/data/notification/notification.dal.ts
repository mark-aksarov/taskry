import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { mapNotificationsToDTO } from "./notification.mapper";
import { notificationListItemSelect } from "./notification.select";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

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
        select: notificationListItemSelect,
      }),

      prisma.notification.count({ where: baseWhere }),
      prisma.notification.count({ where: { ...baseWhere, isRead: false } }),
    ]);

    return mapNotificationsToDTO(notifications, totalCount, unreadCount);
  },
);
