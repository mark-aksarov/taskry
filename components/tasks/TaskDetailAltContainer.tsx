import "server-only";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTaskDetail } from "@/lib/data/task/task.service";
import { TaskDetailAlt } from "./TaskDetailAlt/TaskDetailAlt";
import { TaskDetailAltSkeleton } from "./TaskDetailAlt/TaskDetailAltSkeleton";

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
      id={task.id}
      assignee={task.assignee}
      deadline={task.deadline}
      description={task.description ?? undefined}
      category={task.category}
      project={task.project}
      status={task.status}
      subtasks={task.subtasks}
      attachments={task.attachments}
    />
  );
}
