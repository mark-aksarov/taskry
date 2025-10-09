const styles = "text-sm font-bold text-black dark:text-white";

interface NotificationOverlayItemActorProps {
  children: React.ReactNode;
}

export function NotificationOverlayItemActor({
  children,
}: NotificationOverlayItemActorProps) {
  return <span className={styles}>{children}</span>;
}
