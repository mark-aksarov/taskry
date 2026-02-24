import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TaskDetailHeader } from "./TaskDetailHeader";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { DetailHeaderSkeleton } from "../common/DetailHeader";

interface TaskDetailHeaderContainerProps {
  taskId: number;
}

export function TaskDetailHeaderContainer(
  props: TaskDetailHeaderContainerProps,
) {
  return (
    <Suspense fallback={<DetailHeaderSkeleton />}>
      <TaskDetailHeaderContainerInner {...props} />
    </Suspense>
  );
}

async function TaskDetailHeaderContainerInner({
  taskId,
}: TaskDetailHeaderContainerProps) {
  const task = await getTaskDetail(taskId);

  if (!task) {
    notFound();
  }

  return (
    <TaskDetailHeader
      taskTitle={task.title}
      categoryName={task.category?.name}
    />
  );
}
