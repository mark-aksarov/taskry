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
      user: notification.user ?? undefined,
      customer: notification.customer ?? undefined,
      position: notification.position ?? undefined,
      company: notification.company ?? undefined,
      projectCategory: notification.projectCategory ?? undefined,
      taskCategory: notification.taskCategory ?? undefined,
      subtask: notification.subtask ?? undefined,
      comment: notification.comment ?? undefined,

      projectTitle: notification.projectTitle ?? undefined,
      taskTitle: notification.taskTitle ?? undefined,
      companyName: notification.companyName ?? undefined,
      positionName: notification.positionName ?? undefined,
      taskCategoryName: notification.taskCategoryName ?? undefined,
      projectCategoryName: notification.projectCategoryName ?? undefined,
      subtaskText: notification.subtaskText ?? undefined,
      commentContent: notification.commentContent ?? undefined,
      userFullName: notification.userFullName ?? undefined,
      customerFullName: notification.customerFullName ?? undefined,
    })),
    totalCount,
    unreadCount,
  };
};
