import { Skeleton } from "@/components/ui";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardValue,
} from "../DashboardCard";
import { IconlyWork } from "@/components/icons/IconlyWork";
import { DashboardCardText } from "../DashboardCard";

export const TotalProjectsCard = ({
  totalProjects,
}: {
  totalProjects?: number;
}) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Projects</DashboardCardText>}
      icon={
        <DashboardCardIcon color="blue">
          <IconlyWork size={24} />
        </DashboardCardIcon>
      }
      value={
        totalProjects === undefined ? (
          <Skeleton className="w-[3rem]" size="xl" />
        ) : (
          <DashboardCardValue>{totalProjects}</DashboardCardValue>
        )
      }
    />
  );
};
