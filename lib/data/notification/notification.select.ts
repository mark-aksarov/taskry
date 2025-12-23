import { Prisma } from "@/generated/prisma/client";

export const notificationListItemSelect = {
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
} satisfies Prisma.NotificationSelect;

export type NotificationListItemType = Prisma.NotificationGetPayload<{
  select: typeof notificationListItemSelect;
}>;
