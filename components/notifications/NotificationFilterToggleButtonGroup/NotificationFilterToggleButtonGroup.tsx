import { ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { useTranslations } from "next-intl";

interface NotificationFilterToggleButtonGroupProps {
  notificationsCount: number;
  unreadCount: number;
}

export function NotificationFilterToggleButtonGroup({
  notificationsCount,
  unreadCount,
}: NotificationFilterToggleButtonGroupProps) {
  const t = useTranslations(
    "notifications.NotificationFilterToggleButtonGroup",
  );

  return (
    <ToggleButtonGroup
      defaultSelectedKeys={["all"]}
      selectionMode="single"
      disallowEmptySelection
      variant="contrast"
    >
      <ToggleButton id="all">
        {t("all")} ({notificationsCount})
      </ToggleButton>
      <ToggleButton id="unread">
        {t("unread")} ({unreadCount})
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
