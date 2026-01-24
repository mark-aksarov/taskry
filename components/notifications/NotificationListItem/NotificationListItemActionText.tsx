import { useTranslations } from "next-intl";
import { NotificationType } from "@/generated/prisma/enums";

const styles = "text-sm text-gray-500 dark:text-gray-400 font-normal";

interface NotificationListItemActionTextProps {
  notificationType: NotificationType;
}

export function NotificationListItemActionText({
  notificationType,
}: NotificationListItemActionTextProps) {
  const t = useTranslations("notifications.NotificationListItemActionText");

  return <span className={styles}>&nbsp;{t(notificationType)}&nbsp;</span>;
}
