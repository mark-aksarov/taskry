const styles = "text-sm font-semibold text-black dark:text-white text-wrap";

interface NotificationListItemTargetProps {
  children: React.ReactNode;
}

export function NotificationListItemTarget({
  children,
}: NotificationListItemTargetProps) {
  return <span className={styles}>{children}</span>;
}
