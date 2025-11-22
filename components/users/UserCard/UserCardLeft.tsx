export function UserCardLeft({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-auto flex-col border-r-1 border-gray-300 dark:border-gray-600">
      {children}
    </div>
  );
}
