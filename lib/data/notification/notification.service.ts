import { getAllNotifications } from "./notification.dal";
import { NotificationListItemDTO } from "./notification.dto";

export const getNotifications = async ({
  page,
  pageSize,
  filter,
}: {
  page: number;
  pageSize: number;
  filter?: "unread" | "all";
}): Promise<{
  items: NotificationListItemDTO[];
  totalCount: number;
  unreadCount: number;
}> => {
  const {
    items: notifications,
    totalCount,
    unreadCount,
  } = await getAllNotifications({
    page,
    pageSize,
    filter,
  });

  return {
    items: notifications.map((notification) => ({
      id: notification.id,
      type: notification.type,
      content: notification.content ?? undefined,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
      isRead: notification.isRead,

      actor: notification.actor
        ? {
            id: notification.actor.id,
            fullName: notification.actor.fullName,
            imageUrl: notification.actor.imageUrl ?? undefined,
          }
        : undefined,

      target: notification.target
        ? {
            id: notification.target.id,
            project: notification.target.project ?? undefined,
            task: notification.target.task ?? undefined,
            user: notification.target.user ?? undefined,
            customer: notification.target.customer ?? undefined,
            comment: notification.target.comment
              ? {
                  id: notification.target.comment.id,
                  content: notification.target.comment.content,
                  createdAt: notification.target.comment.createdAt,
                  attachments: notification.target.comment.attachments,
                  project: notification.target.comment.project ?? undefined,
                  task: notification.target.comment.task ?? undefined,
                }
              : undefined,
          }
        : undefined,
    })),
    totalCount,
    unreadCount,
  };
};
