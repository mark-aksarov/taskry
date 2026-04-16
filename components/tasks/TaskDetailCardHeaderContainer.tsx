import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt";
import { TaskDetailCardHeader } from "./TaskDetailCard";
import { getTaskDetail } from "@/lib/data/task/task.dal";

interface TaskDetailCardHeaderContainerProps {
  taskId: number;
}

export function TaskDetailCardHeaderContainer(
  props: TaskDetailCardHeaderContainerProps,
) {
  return (
    <Suspense fallback={<TaskDetailAltSkeleton />}>
      <TaskDetailCardHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function TaskDetailCardHeaderContainerInner({
  taskId,
}: TaskDetailCardHeaderContainerProps) {
  const task = await getTaskDetail(taskId);

  if (!task) {
    notFound();
  }

  return (
    <TaskDetailCardHeader
      taskStatus={task.status}
      taskDeadline={task.deadline}
    />
  );
}
