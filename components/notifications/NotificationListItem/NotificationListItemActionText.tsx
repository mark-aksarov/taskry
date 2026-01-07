import { useTranslations } from "next-intl";

const styles = "text-sm text-gray-500 dark:text-gray-400 font-normal";

interface NotificationListItemActionTextProps {
  notificationType: string;
}

export function NotificationListItemActionText({
  notificationType,
}: NotificationListItemActionTextProps) {
  const t = useTranslations("notifications.NotificationItem.action");

  return <span className={styles}>&nbsp;{t(notificationType)}&nbsp;</span>;
}
