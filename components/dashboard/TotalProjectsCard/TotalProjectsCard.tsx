import { Skeleton } from "@/components/ui";
import { getTotalProjects } from "@/lib/queries/project";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardValue,
} from "../DashboardCard";
import { IconlyWork } from "@/components/icons/IconlyWork";
import { DashboardCardText } from "../DashboardCard";

export const TotalProjectsCard = async () => {
  const totalProjects = await getTotalProjects();

  return (
    <DashboardCard
      text={<DashboardCardText>Total Projects</DashboardCardText>}
      icon={
        <DashboardCardIcon color="blue">
          <IconlyWork size={24} />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{totalProjects}</DashboardCardValue>}
    />
  );
};

export const TotalProjectsCardSkeleton = () => (
  <DashboardCard
    text={<DashboardCardText>Total Projects</DashboardCardText>}
    icon={
      <DashboardCardIcon color="blue">
        <IconlyWork size={24} />
      </DashboardCardIcon>
    }
    value={<Skeleton className="w-[3rem]" size="xl" />}
  />
);
