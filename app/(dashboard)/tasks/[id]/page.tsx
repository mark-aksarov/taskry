import {
  TaskDetailsCard,
  TaskDetailsCardSkeleton,
} from "@/components/tasks/TaskDetailsCard";
import {
  TaskSummaryCard,
  TaskSummaryCardSkeleton,
} from "@/components/tasks/TaskSummaryCard";
import { getTask } from "@/lib/queries/task";
import { Suspense } from "react";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskPromise = getTask(+id);

  return (
    <Suspense
      fallback={
        <>
          <TaskSummaryCardSkeleton />
          <TaskDetailsCardSkeleton />
        </>
      }
    >
      <TaskSummaryCard id={+id} />
      <TaskDetailsCard taskPromise={taskPromise} />
    </Suspense>
  );
}
