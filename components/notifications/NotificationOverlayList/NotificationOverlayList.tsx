import { getNotifications } from "@/lib/queries/notification";
import { NotificationOverlayItem } from "../NotificationOverlayItem";

export async function NotificationOverlayList() {
  const notifications = await getNotifications(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    1,
  );

  return (
    <div>
      {notifications.map((task) => (
        <NotificationOverlayItem
          key={task.notificationId}
          notification={task}
        />
      ))}
    </div>
  );
}
