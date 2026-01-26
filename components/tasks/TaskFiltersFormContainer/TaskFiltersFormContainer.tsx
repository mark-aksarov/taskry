import "server-only";

import {
  TaskFiltersForm,
  TaskFiltersFormStatusCheckboxGroup,
  TaskFiltersFormProjectCheckboxGroup,
  TaskFiltersFormCategoryCheckboxGroup,
  TaskFiltersFormAssigneeCheckboxGroup,
} from "../TaskFiltersForm";

import { TaskFilters } from "@/lib/types";
import { getUserSummaries } from "@/lib/data/user/user.service";
import { getProjectSummaries } from "@/lib/data/project/project.service";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.service";

interface TaskFiltersFormContainerProps {
  filters: TaskFilters;
}

export async function TaskFiltersFormContainer({
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
