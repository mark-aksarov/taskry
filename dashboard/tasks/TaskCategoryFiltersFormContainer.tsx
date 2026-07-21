import "server-only";

import {
  TaskCategoryFiltersForm,
  TaskCategoryFiltersFormSkeleton,
} from "./TaskCategoryFiltersForm";

import { Suspense } from "react";
import { getTaskCategories } from "@/lib/data/taskCategory/taskCategory.dal";

export function TaskCategoryFiltersFormContainer() {
  return (
    <Suspense fallback={<TaskCategoryFiltersFormSkeleton />}>
      <TaskFiltersFormContainerInner />
    </Suspense>
  );
}

async function TaskFiltersFormContainerInner() {
  const categories = await getTaskCategories();

  return <TaskCategoryFiltersForm categoryCheckboxGroupItems={categories} />;
}
