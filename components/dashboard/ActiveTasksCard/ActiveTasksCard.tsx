import { CalendarCheck } from "lucide-react";
import { Skeleton } from "@/components/ui";
import { getActiveTasks, getTotalTasks } from "@/lib/queries/task";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardStat,
  DashboardCardValue,
} from "../DashboardCard";
import { CardHeading } from "@/components/common/Card";

export const ActiveTasksCard = async () => {
  const activeTasksPromise = getActiveTasks();

  const now = new Date();

  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const totalTasksPromise = getTotalTasks(
    startOfCurrentMonth,
    endOfCurrentMonth,
  );
  const prevTotalTasksPromise = getTotalTasks(startOfPrevMonth, endOfPrevMonth);

  const [activeTasks, totalTasks, prevTotalTasks] = await Promise.all([
    activeTasksPromise,
    totalTasksPromise,
    prevTotalTasksPromise,
  ]);

  return (
    <DashboardCard
      heading={<CardHeading>Active Tasks</CardHeading>}
      icon={
        <DashboardCardIcon color="orange">
          <CalendarCheck size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{activeTasks}</DashboardCardValue>}
      stat={<DashboardCardStat value={totalTasks} prevValue={prevTotalTasks} />}
    />
  );
};

export const ActiveTasksCardSkeleton = () => (
  <DashboardCard
    heading={<CardHeading>Active Tasks</CardHeading>}
    icon={
      <DashboardCardIcon color="orange">
        <CalendarCheck size={30} strokeWidth={2} absoluteStrokeWidth />
      </DashboardCardIcon>
    }
    value={<Skeleton className="w-[3rem]" size="3xl" />}
    stat={<Skeleton className="w-[10rem]" size="base" />}
  />
);
