import { getNotifications } from "@/lib/queries/notifications";
import { NotificationItem } from "../NotificationItem";

export async function NotificationList() {
  const notificationsRecipients = await getNotifications(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    1,
  );

  return (
    <div>
      {notificationsRecipients.map((task) => (
        <NotificationItem
          key={task.notificationId}
          notificationRecipient={task}
        />
      ))}
    </div>
  );
}
