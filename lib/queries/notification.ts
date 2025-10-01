import "server-only";

import { cache } from "react";
import prisma from "../prisma";
import { NotificationRecipientWithRelations } from "./types";

export const getNotifications = cache(
  async (
    userId: string,
    workspaceId: number,
  ): Promise<NotificationRecipientWithRelations[]> => {
    return prisma.notificationRecipient.findMany({
      where: {
        userId,
        workspaceId,
      },

      orderBy: [
        {
          notification: {
            createdAt: "desc",
          },
        },
      ],

      include: {
        notification: {
          select: {
            id: true,
            type: true,
            targetName: true,
            createdAt: true,
            updatedAt: true,

            actor: {
              select: {
                id: true,
                name: true,
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
                message: {
                  select: {
                    id: true,
                    body: true,
                  },
                },
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                customer: {
                  select: {
                    id: true,
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },

      take: 5,
    });
  },
);
