interface DashboardCardValueProps {
  children: React.ReactNode;
}

export const DashboardCardValue = ({ children }: DashboardCardValueProps) => {
  return (
    <span className="text-3xl font-bold text-black dark:text-white">
      {children}
    </span>
  );
};
