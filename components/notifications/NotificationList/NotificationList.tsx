import { getNotifications } from "@/lib/queries/notification";
import { NotificationItem } from "../NotificationItem";

export async function NotificationList() {
  const notifications = await getNotifications(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    1,
  );

  return (
    <div>
      {notifications.map((task) => (
        <NotificationItem key={task.notificationId} notification={task} />
      ))}
    </div>
  );
}
