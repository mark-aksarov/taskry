export function NotificationModalActions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-1 flex w-full items-center justify-between rounded-none border-b-1 border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-800">
      {children}
    </div>
  );
}
