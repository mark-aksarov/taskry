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

      project: notification.project ?? undefined,
      task: notification.task ?? undefined,

      projectTitle: notification.projectTitle ?? undefined,
      projectDeadline: notification.projectDeadline ?? undefined,
      projectStatus: notification.projectStatus ?? undefined,

      taskTitle: notification.taskTitle ?? undefined,
      taskDeadline: notification.taskDeadline ?? undefined,
      taskStatus: notification.taskStatus ?? undefined,

      commentContent: notification.commentContent ?? undefined,

      comment: notification.comment
        ? {
            id: notification.comment.id,
            content: notification.comment.content,
          }
        : undefined,
    })),
    totalCount,
    unreadCount,
  };
};
