interface DashboardCardTextProps {
  children: React.ReactNode;
}

export const DashboardCardText = ({ children }: DashboardCardTextProps) => {
  return (
    <span
      data-test="dashboard-card-text"
      className="text-sm font-medium text-nowrap text-gray-500 dark:text-gray-400"
    >
      {children}
    </span>
  );
};
