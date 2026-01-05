"use client";

import useSWR from "swr";
import { TaskDetailDTO } from "@/lib/data/task/task.dto";
import { TaskDetailCompact } from "./TaskDetailCompact/TaskDetailCompact";

interface TaskDetailCompactContainerProps {
  taskId: number;
}

export function TaskDetailCompactContainer({
  taskId,
}: TaskDetailCompactContainerProps) {
  const { data: task } = useSWR<TaskDetailDTO>(`/api/tasks/${taskId}`, {
    suspense: true,
  });

  if (!task) return null;

  return (
    <TaskDetailCompact
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
