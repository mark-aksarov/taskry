import { Skeleton } from "@/components/ui";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
  DashboardCardValue,
} from "../DashboardCard";
import { IconlyCalendar } from "@/components/icons/IconlyCalendar";

export const TotalTasksCard = ({ totalTasks }: { totalTasks?: number }) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Tasks</DashboardCardText>}
      icon={
        <DashboardCardIcon color="orange">
          <IconlyCalendar size={24} />
        </DashboardCardIcon>
      }
      value={
        totalTasks === undefined ? (
          <Skeleton className="w-[3rem]" size="xl" />
        ) : (
          <DashboardCardValue>{totalTasks}</DashboardCardValue>
        )
      }
    />
  );
};
