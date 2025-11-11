import { ToggleButton, ToggleButtonGroup } from "@/components/ui";

interface NotificationFilterToggleButtonGroupProps {
  notificationsCount: number;
  unreadCount: number;
}

export function NotificationFilterToggleButtonGroup({
  notificationsCount,
  unreadCount,
}: NotificationFilterToggleButtonGroupProps) {
  return (
    <ToggleButtonGroup
      defaultSelectedKeys={["all"]}
      selectionMode="single"
      disallowEmptySelection
      variant="contrast"
    >
      <ToggleButton id="all">All ({notificationsCount})</ToggleButton>
      <ToggleButton id="unread">Unread ({unreadCount})</ToggleButton>
    </ToggleButtonGroup>
  );
}
