import { NotificationList } from "../NotificationList";
import { ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { NotificationListItemType } from "../NotificationListItem";

export function Notifications({
  notifications,
}: {
  notifications: NotificationListItemType[];
}) {
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
