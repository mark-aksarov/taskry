export function DetailCardLeft({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-auto flex-col border-gray-300 lg:border-r-1 lg:pr-5 dark:border-gray-600">
      {children}
    </div>
  );
}
