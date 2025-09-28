import { CheckCheck } from "lucide-react";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardValue,
} from "../DashboardCard";
import { ProgressBar } from "../../ui/ProgressBar";
import { getActiveTasks, getTasksDone } from "@/lib/queries/task";
import { CardHeading } from "../../common/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export const TasksDoneCard = async () => {
  const tasksDonePromise = await getTasksDone();
  const activeTasksPromise = getActiveTasks();

  const [tasksDone, activeTasks] = await Promise.all([
    tasksDonePromise,
    activeTasksPromise,
  ]);

  const totalTasks = tasksDone + activeTasks;

  return (
    <DashboardCard
      className="w-full"
      heading={<CardHeading>Tasks Done</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <CheckCheck size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{tasksDone}</DashboardCardValue>}
      progress={
        <ProgressBar
          textClassName="text-sm font-normal"
          label={`${tasksDone} / ${totalTasks}`}
          value={(tasksDone / totalTasks) * 100}
        />
      }
    />
  );
};

export const TasksDoneCardSkeleton = () => {
  return (
    <DashboardCard
      className="w-full"
      heading={<CardHeading>Tasks Done</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <CheckCheck size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<Skeleton className="w-[3rem] text-3xl" />}
      stat={<Skeleton className="w-full text-base" />}
    />
  );
};
