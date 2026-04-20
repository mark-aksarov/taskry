import { TotalUsersCardLayout } from "./TotalUsersCardLayout";
import { DashboardCardValue } from "@/dashboard/common/DashboardCard";

export const TotalUsersCard = ({ totalUsers }: { totalUsers?: number }) => {
  return (
    <TotalUsersCardLayout>
      <DashboardCardValue>{totalUsers}</DashboardCardValue>
    </TotalUsersCardLayout>
  );
};
