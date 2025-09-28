interface DashboardCardValueProps {
  children: React.ReactNode;
}

export const DashboardCardValue = ({ children }: DashboardCardValueProps) => {
  return (
    <span className="text-3xl font-extrabold text-black dark:text-white">
      {children}
    </span>
  );
};
