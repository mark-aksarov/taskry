"use client";

import useSWR from "swr";
import { TaskDetail } from "./TaskDetail";
import { GetTaskDetailType } from "@/lib/queries/task";
import { TaskDetailSkeleton } from "./TaskDetailSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TaskDetailContainer({ taskId }: { taskId: number }) {
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
      description={task.description ?? undefined}
      deadline={task.deadline}
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
