import "server-only";

import { Suspense } from "react";
import { TaskFilters } from "@/lib/types";
import { TaskFiltersProvider } from "../TaskFiltersContext/TaskFiltersContext";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { TaskFiltersForm, TaskFiltersFormSkeleton } from "../TaskFiltersForm";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";
import { TaskFiltersFormStatusCheckboxGroup } from "../TaskFiltersFormStatusCheckboxGroup";
import { TaskFiltersFormProjectCheckboxGroup } from "../TaskFiltersFormProjectCheckboxGroup";
import { TaskFiltersFormAssigneeCheckboxGroup } from "../TaskFiltersFormAssigneeCheckboxGroup";
import { TaskFiltersFormCategoryCheckboxGroup } from "../TaskFiltersFormCategoryCheckboxGroup";

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
    <TaskFiltersProvider initialFilters={filters}>
      <TaskFiltersForm
        assigneeCheckboxGroup={
          <TaskFiltersFormAssigneeCheckboxGroup users={users} />
        }
        categoryCheckboxGroup={
          <TaskFiltersFormCategoryCheckboxGroup categories={categories} />
        }
        projectCheckboxGroup={
          <TaskFiltersFormProjectCheckboxGroup projects={projects} />
        }
        statusCheckboxGroup={<TaskFiltersFormStatusCheckboxGroup />}
      />
    </TaskFiltersProvider>
  );
}
