import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { verifySession } from "@/lib/data/utils/verifySession";

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
      }),

      prisma.notification.count({ where: baseWhere }),
      prisma.notification.count({ where: { ...baseWhere, isRead: false } }),
    ]);

    return { items: notifications, totalCount, unreadCount };
  },
);
