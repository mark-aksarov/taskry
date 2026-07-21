"use client";

import {
  UpdateTaskCategoryRelForm,
  UpdateTaskCategoryRelFormSkeleton,
} from "./UpdateTaskCategoryRelForm";

import useSWR from "swr";
import { TaskCategoryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface UpdateTaskCategoryRelFormContainerProps {
  taskId: number;
  categoryId?: number;
}

export function UpdateTaskCategoryRelFormContainer({
  taskId,
  categoryId,
}: UpdateTaskCategoryRelFormContainerProps) {
  const { data: categories } = useSWR<TaskCategoryDTO[]>(
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
