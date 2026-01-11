import { useTranslations } from "next-intl";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { ToggleButtonGroupProps } from "@/components/ui/ToggleButtonGroup/ToggleButtonGroup";

interface NotificationFilterToggleButtonGroupProps
  extends Pick<ToggleButtonGroupProps, "selectedKeys" | "onSelectionChange"> {
  notificationsCount: number;
  unreadCount: number;
}

const styles =
  "w-full rounded-none sticky top-0 z-1 border-b-1 border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-800";

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
      className={styles}
    >
      <ToggleButton id="all">
        {t("all")} ({notificationsCount})
      </ToggleButton>
      <ToggleButton id="unread" isDisabled={!unreadCount}>
        {t("unread")} ({unreadCount})
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export function NotificationFilterToggleButtonGroupSkeleton() {
  return (
    <div className={styles}>
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
    </div>
  );
}
