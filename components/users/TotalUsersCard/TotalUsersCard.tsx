import { TotalUsersCardLayout } from "./TotalUsersCardLayout";
import { DashboardCardValue } from "@/components/common/DashboardCard";

export const TotalUsersCard = ({ totalUsers }: { totalUsers?: number }) => {
  return (
    <TotalUsersCardLayout>
      <DashboardCardValue>{totalUsers}</DashboardCardValue>
    </TotalUsersCardLayout>
  );
};
