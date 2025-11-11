export function NotificationModalContent({
  children,
}: {
  children: [React.ReactNode, React.ReactNode];
}) {
  return (
    <div className="relative flex flex-col">
      <div className="sticky top-0 z-1 border-b-1 border-gray-300 bg-white px-4 py-3 dark:border-gray-600 dark:bg-gray-800">
        {children[0]}
      </div>

      {children[1]}
    </div>
  );
}
