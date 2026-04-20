"use client";

import {
  UpdateTaskCategoryRelForm,
  UpdateTaskCategoryRelFormSkeleton,
} from "./UpdateTaskCategoryRelForm";

import useSWR from "swr";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface UpdateTaskCategoryRelFormContainerProps {
  taskId: number;
  categoryId?: number;
}

export function UpdateTaskCategoryRelFormContainer({
  taskId,
  categoryId,
}: UpdateTaskCategoryRelFormContainerProps) {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    "/api/task-categories",
  );

  // Show skeleton while loading
  if (!categories) {
    return <UpdateTaskCategoryRelFormSkeleton />;
  }

  return (
    <UpdateTaskCategoryRelForm
      taskId={taskId}
      categoryId={categoryId}
      taskCategorySelectItems={categories}
    />
  );
}
