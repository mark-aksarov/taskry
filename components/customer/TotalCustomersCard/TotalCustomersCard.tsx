import { DashboardCardValue } from "@/components/common/DashboardCard";
import { TotalCustomersCardLayout } from "./TotalCustomersCardLayout";

export const TotalCustomersCard = ({
  totalCustomers,
}: {
  totalCustomers?: number;
}) => {
  return (
    <TotalCustomersCardLayout>
      <DashboardCardValue>{totalCustomers}</DashboardCardValue>
    </TotalCustomersCardLayout>
  );
};
