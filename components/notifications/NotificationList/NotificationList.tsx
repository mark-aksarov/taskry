import { NotificationListItem } from "../NotificationListItem";
import { NotificationRecipientWithRelations } from "@/lib/queries/types";

export async function NotificationList({
  notifications,
}: {
  notifications: NotificationRecipientWithRelations[];
}) {
  return (
    <div>
      {notifications.map((task) => (
        <NotificationListItem key={task.notificationId} notification={task} />
      ))}
    </div>
  );
}
