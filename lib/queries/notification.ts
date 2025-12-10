import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetNotificationsListType = ThenArg<
  ReturnType<typeof getNotificationsList>
>;

export const getNotificationsList = cache(
  async ({
    userId,
    page,
    pageSize,
    filter,
  }: {
    userId: string;
    page: number;
    pageSize: number;
    filter?: string;
  }) => {
    const skip = (page - 1) * pageSize;

    const where: any = { recipientId: userId };

    if (filter === "unread") where.isRead = false;

    return prisma.notification.findMany({
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
  },
);

export const getNotificationsCount = cache(
  async ({ userId }: { userId: string }) => {
    const where: any = { recipientId: userId };
    return prisma.notification.count({ where });
  },
);

export const getNotificationsUnreadCount = cache(
  async ({ userId }: { userId: string }) => {
    const where: any = {
      recipientId: userId,
      isRead: false,
    };
    return prisma.notification.count({ where });
  },
);
