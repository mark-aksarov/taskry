"use client";

import useSWR from "swr";
import { TaskDetailCompact } from "../TaskDetailCompact/TaskDetailCompact";
import { GetTaskDetailType } from "@/lib/queries/task";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TaskDetailCompactClientContainerProps {
  taskId: number;
}

export function TaskDetailCompactClientContainer({
  taskId,
}: TaskDetailCompactClientContainerProps) {
  const { data: task } = useSWR<GetTaskDetailType>(
    `/api/tasks/${taskId}`,
    fetcher,
    { suspense: true },
  );

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
      status={{
        id: task.status.id,
        name: task.status.name,
      }}
      subtasks={task.subtasks}
      attachments={task.attachments}
    />
  );
}
