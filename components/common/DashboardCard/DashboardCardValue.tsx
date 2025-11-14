interface DashboardCardValueProps {
  children: React.ReactNode;
}

export const DashboardCardValue = ({ children }: DashboardCardValueProps) => {
  return (
    <span className="text-xl font-extrabold text-black dark:text-white">
      {children}
    </span>
  );
};
