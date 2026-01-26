"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { TaskDetail } from "./TaskDetail/TaskDetail";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { TaskDetailSkeleton } from "./TaskDetail/TaskDetailSkeleton";

interface TaskDetailContainerProps {
  taskId: number;
}

export function TaskDetailContainer(props: TaskDetailContainerProps) {
  return (
    <Suspense fallback={<TaskDetailSkeleton />}>
      <TaskDetailContainerInner {...props} />
    </Suspense>
  );
}

function TaskDetailContainerInner({ taskId }: TaskDetailContainerProps) {
  const { data: task } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    suspense: true,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return (
    <TaskDetail
      id={task.id}
      title={task.title}
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
