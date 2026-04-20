export function DashboardCardsGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-test="dashboard-cards"
      className="grid max-md:grid-cols-1 max-md:gap-4 md:gap-6 md:max-lg:grid-cols-2 lg:grid-cols-4"
    >
      {children}
    </div>
  );
}
