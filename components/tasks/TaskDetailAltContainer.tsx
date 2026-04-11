import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt";
import { getTaskDetail } from "@/lib/data/task/task.dal";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";

interface TaskDetailAltContainerProps {
  taskId: number;
}

export function TaskDetailAltContainer(props: TaskDetailAltContainerProps) {
  return (
    <Suspense fallback={<TaskDetailAltSkeleton />}>
      <TaskDetailAltContainerInner {...props} />
    </Suspense>
  );
}

async function TaskDetailAltContainerInner({
  taskId,
}: TaskDetailAltContainerProps) {
  const task = await getTaskDetail(taskId);

  if (!task) {
    notFound();
  }

  return (
    <TaskDetailAlt
      title={task.title}
      creator={task.creator}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description}
      category={task.category}
      project={task.project}
      status={task.status}
    />
  );
}
