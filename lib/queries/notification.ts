import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { ThenArg } from "./types";

export type GetNotificationsType = ThenArg<ReturnType<typeof getNotifications>>;
export const getNotifications = cache(async (userId: string) => {
  return prisma.notification.findMany({
    where: {
      recipientId: userId,
    },

    orderBy: [
      {
        createdAt: "desc",
      },
    ],

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
});
