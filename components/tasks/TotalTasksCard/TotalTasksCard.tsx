import { DashboardCardValue } from "@/components/common/DashboardCard";
import { TotalTasksCardLayout } from "./TotalTasksCardLayout";

export const TotalTasksCard = ({ totalTasks }: { totalTasks?: number }) => {
  return (
    <TotalTasksCardLayout>
      <DashboardCardValue>{totalTasks}</DashboardCardValue>
    </TotalTasksCardLayout>
  );
};
