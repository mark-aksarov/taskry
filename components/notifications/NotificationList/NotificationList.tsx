export function NotificationList({ children }: { children: React.ReactNode }) {
  return (
    <div data-test="notification-list" className="flex flex-col">
      {children}
    </div>
  );
}
