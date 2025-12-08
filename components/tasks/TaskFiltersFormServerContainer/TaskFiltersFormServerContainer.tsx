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
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function TaskFiltersFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const categories = await getTaskCategorySummaries(workspaceId);
  const projects = await getProjectSummaries(workspaceId);
  const users = await getUserSummaries(workspaceId);

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
