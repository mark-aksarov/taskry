export function DetailCardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b-1 border-gray-300 max-lg:p-4 lg:p-5 dark:border-gray-600">
      {children}
    </div>
  );
}
