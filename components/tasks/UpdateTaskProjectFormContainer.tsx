"use client";

import {
  UpdateTaskProjectForm,
  UpdateTaskProjectFormSkeleton,
} from "./UpdateTaskProjectForm";

import useSWR from "swr";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";

interface UpdateTaskProjectFormContainerProps {
  taskId: number;
}

export function UpdateTaskProjectFormContainer({
  taskId,
}: UpdateTaskProjectFormContainerProps) {
  const { data: projects } = useSWR<ProjectSummaryDTO[]>("/api/projects");

  const {
    data: task,
    error: taskError,
    isValidating,
  } = useSWR<TaskFormDataDTO | null>(`/api/tasks/${taskId}?view=edit`, {
    // disable revalidation on focus to prevent UI flicker caused by isValidating
    revalidateOnFocus: false,
  });

  if (taskError) {
    throw new Error();
  }

  // Show skeleton while loading
  // or revalidating to prevent stale data rendering
  const showSkeleton = !projects || !task || isValidating;

  if (showSkeleton) {
    return <UpdateTaskProjectFormSkeleton />;
  }

  return (
    <UpdateTaskProjectForm
      taskId={taskId}
      projectId={task.projectId}
      projectSelectItems={projects}
    />
  );
}
