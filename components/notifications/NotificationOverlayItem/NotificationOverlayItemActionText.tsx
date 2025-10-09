const styles = "text-sm text-gray-500 dark:text-gray-400 font-normal";

interface NotificationOverlayItemActionTextProps {
  children: React.ReactNode;
}

export function NotificationOverlayItemActionText({
  children,
}: NotificationOverlayItemActionTextProps) {
  return <span className={styles}>{children}</span>;
}
