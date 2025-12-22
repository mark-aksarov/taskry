import {
  TaskFiltersForm,
  TaskFiltersFormStatusCheckboxGroup,
  TaskFiltersFormProjectCheckboxGroup,
  TaskFiltersFormCategoryCheckboxGroup,
  TaskFiltersFormAssigneeCheckboxGroup,
} from "../TaskFiltersForm";

import { getUserSummaries } from "@/lib/dal/user";
import { getProjectSummaries } from "@/lib/dal/project";
import { getTaskCategorySummaries } from "@/lib/dal/task";
import { TaskFilters } from "@/lib/dto/filters/taskFilters";

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
