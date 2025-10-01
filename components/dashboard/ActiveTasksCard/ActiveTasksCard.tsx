import { CalendarCheck } from "lucide-react";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardStat,
  DashboardCardValue,
} from "../DashboardCard";
import { getActiveTasks, getTotalTasks } from "@/lib/queries/task";
import { CardHeading } from "@/components/common/Card";
import { Skeleton } from "@/components/ui/Skeleton";

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
      className="w-full"
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
    className="w-full"
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
