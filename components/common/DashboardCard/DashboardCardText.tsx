interface DashboardCardTextProps {
  children: React.ReactNode;
}

export const DashboardCardText = ({ children }: DashboardCardTextProps) => {
  return (
    <div
      data-test="dashboard-card-text"
      className="truncate text-sm font-medium text-nowrap text-gray-500 dark:text-gray-400"
    >
      {children}
    </div>
  );
};
