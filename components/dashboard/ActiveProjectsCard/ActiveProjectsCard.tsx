import { FolderClosed } from "lucide-react";
import { Skeleton } from "@/components/ui";
import { getActiveProjects, getTotalProjects } from "@/lib/queries/project";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardStat,
  DashboardCardValue,
} from "../DashboardCard";
import { CardHeading } from "@/components/common/Card";

export const ActiveProjectsCard = async () => {
  const activeProjectsPromise = getActiveProjects();

  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const totalProjectsPromise = getTotalProjects(
    startOfCurrentMonth,
    endOfCurrentMonth,
  );
  const prevTotalProjectsPromise = getTotalProjects(
    startOfPrevMonth,
    endOfPrevMonth,
  );

  const [activeProjects, totalProjects, prevTotalProjects] = await Promise.all([
    activeProjectsPromise,
    totalProjectsPromise,
    prevTotalProjectsPromise,
  ]);

  return (
    <DashboardCard
      heading={<CardHeading>Active Projects</CardHeading>}
      icon={
        <DashboardCardIcon color="blue">
          <FolderClosed size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{activeProjects}</DashboardCardValue>}
      stat={
        <DashboardCardStat
          value={totalProjects}
          prevValue={prevTotalProjects}
        />
      }
    />
  );
};

export const ActiveProjectsCardSkeleton = () => (
  <DashboardCard
    heading={<CardHeading>Active Projects</CardHeading>}
    icon={
      <DashboardCardIcon color="blue">
        <FolderClosed size={30} strokeWidth={2} absoluteStrokeWidth />
      </DashboardCardIcon>
    }
    value={<Skeleton className="w-[3rem]" size="3xl" />}
    stat={<Skeleton className="w-[10rem]" size="base" />}
  />
);
