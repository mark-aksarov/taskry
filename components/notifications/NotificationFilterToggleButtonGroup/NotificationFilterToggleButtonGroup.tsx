import { useTranslations } from "next-intl";
import { ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { ToggleButtonGroupProps } from "@/components/ui/ToggleButtonGroup/ToggleButtonGroup";

interface NotificationFilterToggleButtonGroupProps
  extends Pick<ToggleButtonGroupProps, "selectedKeys" | "onSelectionChange"> {
  notificationsCount: number;
  unreadCount: number;
}

export function NotificationFilterToggleButtonGroup({
  selectedKeys,
  onSelectionChange,
  notificationsCount,
  unreadCount,
}: NotificationFilterToggleButtonGroupProps) {
  const t = useTranslations(
    "notifications.NotificationFilterToggleButtonGroup",
  );

  return (
    <ToggleButtonGroup
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
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
