const styles = "text-gray-500 dark:text-gray-400 text-xs font-medium";

interface NotificationListItemDateProps {
  children: React.ReactNode;
}

export function NotificationListItemDate({
  children,
}: NotificationListItemDateProps) {
  return <span className={styles}>{children}</span>;
}
