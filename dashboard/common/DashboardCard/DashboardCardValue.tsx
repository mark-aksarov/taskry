interface DashboardCardValueProps {
  children: React.ReactNode;
}

export const DashboardCardValue = ({ children }: DashboardCardValueProps) => {
  return (
    <div
      data-test="dashboard-card-value"
      className="text-xl font-extrabold text-(--text-primary)"
    >
      {children}
    </div>
  );
};
