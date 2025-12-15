import {
  TaskFiltersForm,
  TaskFiltersFormStatusCheckboxGroup,
  TaskFiltersFormProjectCheckboxGroup,
  TaskFiltersFormCategoryCheckboxGroup,
  TaskFiltersFormAssigneeCheckboxGroup,
} from "../TaskFiltersForm";

import { getUserSummaries } from "@/lib/queries/user";
import { getProjectSummaries } from "@/lib/queries/project";
import { getTaskCategorySummaries } from "@/lib/queries/task";

export async function TaskFiltersFormServerContainer() {
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
    />
  );
}
