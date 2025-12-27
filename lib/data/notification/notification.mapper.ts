import { NotificationsDTO } from "./notification.dto";
import { NotificationListItemType } from "./notification.select";

export function mapNotificationsToDTO(
  notifications: NotificationListItemType[],
  totalCount: number,
  unreadCount: number,
): NotificationsDTO {
  return {
    items: notifications.map((notification) => ({
      id: notification.id,
      type: notification.type,
      targetName: notification.targetName ?? undefined,
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
                  repliesCount: notification.target.comment._count.replies,
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
}
