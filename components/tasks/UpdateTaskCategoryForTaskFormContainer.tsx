"use client";

import {
  UpdateTaskCategoryForTaskForm,
  UpdateTaskCategoryForTaskFormSkeleton,
} from "./UpdateTaskCategoryForTaskForm";

import useSWR from "swr";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface UpdateTaskCategoryForTaskFormContainerProps {
  taskId: number;
}

export function UpdateTaskCategoryForTaskFormContainer({
  taskId,
}: UpdateTaskCategoryForTaskFormContainerProps) {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    "/api/task-categories",
  );

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
  const showSkeleton = !categories || !task || isValidating;

  if (showSkeleton) {
    return <UpdateTaskCategoryForTaskFormSkeleton />;
  }

  return (
    <UpdateTaskCategoryForTaskForm
      taskId={taskId}
      categoryId={task.categoryId}
      taskCategorySelectItems={categories}
    />
  );
}
