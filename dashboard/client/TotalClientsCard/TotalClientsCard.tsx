import { DashboardCardValue } from "@/dashboard/common/DashboardCard";
import { TotalClientsCardLayout } from "./TotalClientsCardLayout";

export const TotalClientsCard = ({
  totalClients,
}: {
  totalClients?: number;
}) => {
  return (
    <TotalClientsCardLayout>
      <DashboardCardValue>{totalClients}</DashboardCardValue>
    </TotalClientsCardLayout>
  );
};
