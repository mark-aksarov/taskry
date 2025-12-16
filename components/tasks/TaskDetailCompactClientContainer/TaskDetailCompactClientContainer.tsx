"use client";

import useSWR from "swr";
import { GetTaskDetailType } from "@/lib/data/task";
import { TaskDetailCompact } from "../TaskDetailCompact/TaskDetailCompact";

interface TaskDetailCompactClientContainerProps {
  taskId: number;
}

export function TaskDetailCompactClientContainer({
  taskId,
}: TaskDetailCompactClientContainerProps) {
  const { data: task } = useSWR<GetTaskDetailType>(`/api/tasks/${taskId}`, {
    suspense: true,
  });

  if (!task) return null;

  return (
    <TaskDetailCompact
      id={task.id}
      title={task.title}
      assignee={
        task.assignee
          ? {
              id: task.assignee.id,
              fullName: task.assignee.fullName,
              imageUrl: task.assignee.imageUrl ?? undefined,
            }
          : undefined
      }
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
