import { getNotifications } from "@/lib/queries/notification";
import { Notifications } from "./Notifications";

export async function NotificationsContainer() {
  const notifications = await getNotifications(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    1,
  );

  return <Notifications notifications={notifications} />;
}
