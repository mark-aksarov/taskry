import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { getSessionOrThrow } from "../utils/getSessionOrThrow";
import { mapNotificationListItemToDTO } from "../mappers/notification";

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
    const session = await getSessionOrThrow();
    const recipientId = session.user.id;
    const workspaceId = session.user.workspaceId;

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

      select: {
        id: true,
        type: true,
        targetName: true,
        createdAt: true,
        updatedAt: true,
        isRead: true,

        actor: {
          select: {
            id: true,
            fullName: true,
            imageUrl: true,
          },
        },

        target: {
          select: {
            id: true,

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
                createdAt: true,

                attachments: {
                  select: {
                    id: true,
                    fileUrl: true,
                    fileName: true,
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

                _count: {
                  select: {
                    replies: true,
                  },
                },
              },
            },
          },
        },
      },
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
