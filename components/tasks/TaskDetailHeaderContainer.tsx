import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTaskDetail } from "@/lib/data/task/task.service";
import { DetailHeaderSkeleton } from "../common/DetailHeader";
import { DetailHeader } from "@/components/common/DetailHeader";
import { TaskDetailHeaderImage } from "./TaskDetailHeaderImage";

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
    <DetailHeader
      title={task.title}
      image={<TaskDetailHeaderImage />}
      subtitle={task.category.name}
    />
  );
}
