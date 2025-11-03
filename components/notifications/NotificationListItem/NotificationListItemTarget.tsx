const styles = "text-sm font-semibold text-black dark:text-white";

interface NotificationListItemTargetProps {
  children: React.ReactNode;
}

export function NotificationListItemTarget({
  children,
}: NotificationListItemTargetProps) {
  return <span className={styles}>{children}</span>;
}
