const styles = "text-gray-500 dark:text-gray-400 text-xs font-medium";

interface NotificationOverlayItemDateProps {
  children: React.ReactNode;
}

export function NotificationOverlayItemDate({
  children,
}: NotificationOverlayItemDateProps) {
  return <span className={styles}>{children}</span>;
}
