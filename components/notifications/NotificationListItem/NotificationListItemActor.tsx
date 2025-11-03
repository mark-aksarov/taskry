const styles = "text-sm font-semibold text-black dark:text-white";

interface NotificationListItemActorProps {
  children: React.ReactNode;
}

export function NotificationListItemActor({
  children,
}: NotificationListItemActorProps) {
  return <span className={styles}>{children}</span>;
}
