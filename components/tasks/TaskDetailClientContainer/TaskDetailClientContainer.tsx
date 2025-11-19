"use client";

import useSWR from "swr";
import { TaskDetail } from "../TaskDetail/TaskDetail";
import { GetTaskDetailType } from "@/lib/queries/task";
import { TaskDetailSkeleton } from "../TaskDetail/TaskDetailSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TaskDetailClientContainerProps {
  taskId: number;
}

export function TaskDetailClientContainer({
  taskId,
}: TaskDetailClientContainerProps) {
  const {
    data: task,
    error,
    isLoading,
  } = useSWR<GetTaskDetailType>(`/api/tasks/${taskId}`, fetcher);

  if (isLoading) {
    return <TaskDetailSkeleton />;
  }

  if (!task) return null;

  return (
    <TaskDetail
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
        name: task.status.nameEn,
      }}
      subtasks={task.subtasks}
      attachments={task.attachments}
    />
  );
}
