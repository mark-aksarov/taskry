"use client";

import useSWR from "swr";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { TaskFormSkeleton } from "./TaskFormSkeleton";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface UpdateTaskFormContainerProps {
  taskId: number;
}

export function UpdateTaskFormContainer({
  taskId,
}: UpdateTaskFormContainerProps) {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    "/api/task-categories",
  );
  const { data: projects } = useSWR<ProjectSummaryDTO[]>("/api/projects");

  const { data: users } = useSWR<UserSummaryDTO[]>("/api/users");

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
  const showSkeleton =
    !categories || !projects || !users || !task || isValidating;

  if (showSkeleton) {
    return <TaskFormSkeleton />;
  }

  return (
    <UpdateTaskForm
      taskId={taskId}
      title={task.title}
      description={task.description}
      deadline={task.deadline}
      status={task.status}
      categoryId={task.categoryId}
      projectId={task.projectId}
      assigneeId={task.assigneeId}
      taskCategorySelectItems={categories}
      projectSelectItems={projects}
      assigneeSelectItems={users}
    />
  );
}
