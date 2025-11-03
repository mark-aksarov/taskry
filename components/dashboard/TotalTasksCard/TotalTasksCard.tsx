import { Skeleton } from "@/components/ui";
import { getTotalTasks } from "@/lib/queries/task";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
  DashboardCardValue,
} from "../DashboardCard";
import { IconlyCalendar } from "@/components/icons/IconlyCalendar";

export const TotalTasksCard = async () => {
  const totalTasks = getTotalTasks();

  return (
    <DashboardCard
      text={<DashboardCardText>Total Tasks</DashboardCardText>}
      icon={
        <DashboardCardIcon color="orange">
          <IconlyCalendar size={24} />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{totalTasks}</DashboardCardValue>}
    />
  );
};

export const TotalTasksCardSkeleton = () => (
  <DashboardCard
    text={<DashboardCardText>Total Tasks</DashboardCardText>}
    icon={
      <DashboardCardIcon color="orange">
        <IconlyCalendar size={24} />
      </DashboardCardIcon>
    }
    value={<Skeleton className="w-[3rem]" size="xl" />}
  />
);
