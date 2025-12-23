import {
  TaskFiltersForm,
  TaskFiltersFormStatusCheckboxGroup,
  TaskFiltersFormProjectCheckboxGroup,
  TaskFiltersFormCategoryCheckboxGroup,
  TaskFiltersFormAssigneeCheckboxGroup,
} from "../TaskFiltersForm";

import { TaskFilters } from "@/lib/data/task/task.dto";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getProjectSummaries } from "@/lib/data/project/project.dal";
import { getTaskCategorySummaries } from "@/lib/data/taskCategory/taskCategory.dal";

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
