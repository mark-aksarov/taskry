const styles = "text-sm font-bold text-black dark:text-white";

interface NotificationOverlayItemTargetProps {
  children: React.ReactNode;
}

export function NotificationOverlayItemTarget({
  children,
}: NotificationOverlayItemTargetProps) {
  return <span className={styles}>{children}</span>;
}
