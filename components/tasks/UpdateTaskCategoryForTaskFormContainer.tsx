"use client";

import {
  UpdateTaskCategoryForTaskForm,
  UpdateTaskCategoryForTaskFormSkeleton,
} from "./UpdateTaskCategoryForTaskForm";

import useSWR from "swr";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface UpdateTaskCategoryForTaskFormContainerProps {
  taskId: number;
  categoryId?: number;
}

export function UpdateTaskCategoryForTaskFormContainer({
  taskId,
  categoryId,
}: UpdateTaskCategoryForTaskFormContainerProps) {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    "/api/task-categories",
  );

  // Show skeleton while loading
  if (!categories) {
    return <UpdateTaskCategoryForTaskFormSkeleton />;
  }

  return (
    <UpdateTaskCategoryForTaskForm
      taskId={taskId}
      categoryId={categoryId}
      taskCategorySelectItems={categories}
    />
  );
}
