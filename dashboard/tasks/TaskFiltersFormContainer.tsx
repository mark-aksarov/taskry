import "server-only";

import { Suspense } from "react";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "./TaskFiltersForm";
import { getTaskCategories } from "@/lib/data/taskCategory/taskCategory.dal";

export function TaskFiltersFormContainer() {
  return (
    <Suspense fallback={<TaskFiltersFormSkeleton />}>
      <TaskFiltersFormContainerInner />
    </Suspense>
  );
}

async function TaskFiltersFormContainerInner() {
  const categories = await getTaskCategories();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <TaskFiltersForm
      categoryCheckboxGroupItems={categories}
      projectCheckboxGroupItems={projects}
      assigneeCheckboxGroupItems={users}
    />
  );
}
