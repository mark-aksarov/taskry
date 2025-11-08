import "server-only";

import { cache } from "react";
import prisma from "../prisma";

export const getNotifications = cache(
  async (userId: string, workspaceId: number) => {
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
                message: {
                  select: {
                    id: true,
                    body: true,
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
                        likes: true,
                        replies: true,
                      },
                    },

                    likes: {
                      where: {
                        userId,
                      },
                      select: {
                        userId: true,
                      },
                    },
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
