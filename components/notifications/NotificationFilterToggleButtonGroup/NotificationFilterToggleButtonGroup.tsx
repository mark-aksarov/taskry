import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from "@/components/ui/ToggleButtonGroup";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/Skeleton";

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

  if (notificationsCount === 0) {
    return null;
  }

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
      <ToggleButton
        data-test="unread-notification-button"
        id="unread"
        isDisabled={!unreadCount}
      >
        {t("unread")} ({unreadCount})
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export function NotificationFilterToggleButtonGroupSkeleton() {
  return (
    <div className="inline-flex gap-4">
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
    </div>
  );
}
