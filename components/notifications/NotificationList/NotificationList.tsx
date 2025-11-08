import {
  NotificationListItem,
  NotificationListItemType,
} from "../NotificationListItem";

export function NotificationList({
  notifications,
}: {
  notifications: NotificationListItemType[];
}) {
  return (
    <div>
      {notifications.map((task) => (
        <NotificationListItem key={task.notificationId} notification={task} />
      ))}
    </div>
  );
}
