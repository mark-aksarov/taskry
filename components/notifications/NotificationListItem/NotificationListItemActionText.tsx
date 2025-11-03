const styles = "text-sm text-gray-500 dark:text-gray-400 font-normal";

interface NotificationListItemActionTextProps {
  children: React.ReactNode;
}

export function NotificationListItemActionText({
  children,
}: NotificationListItemActionTextProps) {
  return <span className={styles}>{children}</span>;
}
