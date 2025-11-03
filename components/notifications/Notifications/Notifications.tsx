import { ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { getNotifications } from "@/lib/queries/notification";
import { NotificationList } from "../NotificationList";

export async function Notifications() {
  const notifications = await getNotifications(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    1,
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-0 z-1 border-b-1 border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-800">
        <ToggleButtonGroup
          defaultSelectedKeys={["all"]}
          selectionMode="single"
          disallowEmptySelection
          variant="contrast"
        >
          <ToggleButton id="all">All ({notifications.length})</ToggleButton>
          <ToggleButton id="unread">Unread ({unreadCount})</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <NotificationList notifications={notifications} />
    </div>
  );
}
