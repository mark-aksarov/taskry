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

interface TaskFiltersFormServerContainerProps {
  filters: TaskFilters;
}

export async function TaskFiltersFormServerContainer({
  filters,
}: TaskFiltersFormServerContainerProps) {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
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
      filters={filters}
    />
  );
}
