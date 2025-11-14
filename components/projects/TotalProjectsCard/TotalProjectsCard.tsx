import { DashboardCardValue } from "@/components/common/DashboardCard";
import { TotalProjectsCardLayout } from "./TotalProjectsCardLayout";

export const TotalProjectsCard = ({
  totalProjects,
}: {
  totalProjects?: number;
}) => {
  return (
    <TotalProjectsCardLayout>
      <DashboardCardValue>{totalProjects}</DashboardCardValue>
    </TotalProjectsCardLayout>
  );
};
