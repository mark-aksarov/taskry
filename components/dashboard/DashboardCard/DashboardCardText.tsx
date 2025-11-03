interface DashboardCardTextProps {
  children: React.ReactNode;
}

export const DashboardCardText = ({ children }: DashboardCardTextProps) => {
  return (
    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {children}
    </span>
  );
};
