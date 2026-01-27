import "server-only";

import {
  TaskFiltersForm,
  TaskFiltersFormStatusCheckboxGroup,
  TaskFiltersFormProjectCheckboxGroup,
  TaskFiltersFormCategoryCheckboxGroup,
  TaskFiltersFormAssigneeCheckboxGroup,
  TaskFiltersFormSkeleton,
} from "../TaskFiltersForm";

import { Suspense } from "react";
import { TaskFilters } from "@/lib/types";
import { getUserSummaries } from "@/lib/data/user/user.service";
import { getProjectSummaries } from "@/lib/data/project/project.service";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.service";

interface TaskFiltersFormContainerProps {
  filters?: TaskFilters;
}

export function TaskFiltersFormContainer(props: TaskFiltersFormContainerProps) {
  return (
    <Suspense fallback={<TaskFiltersFormSkeleton />}>
      <TaskFiltersFormContainerInner {...props} />
    </Suspense>
  );
}

async function TaskFiltersFormContainerInner({
  filters,
}: TaskFiltersFormContainerProps) {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <TaskFiltersForm
      assigneeCheckboxGroup={
        <TaskFiltersFormAssigneeCheckboxGroup filters={filters} users={users} />
      }
      categoryCheckboxGroup={
        <TaskFiltersFormCategoryCheckboxGroup
          filters={filters}
          categories={categories}
        />
      }
      projectCheckboxGroup={
        <TaskFiltersFormProjectCheckboxGroup
          filters={filters}
          projects={projects}
        />
      }
      statusCheckboxGroup={
        <TaskFiltersFormStatusCheckboxGroup filters={filters} />
      }
      filters={filters}
    />
  );
}
