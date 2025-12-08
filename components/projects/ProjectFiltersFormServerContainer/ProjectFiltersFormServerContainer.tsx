import {
  ProjectFiltersForm,
  ProjectFiltersFormUserCheckboxGroup,
  ProjectFiltersFormStatusCheckboxGroup,
  ProjectFiltersFormCategoryCheckboxGroup,
  ProjectFiltersFormCustomerCheckboxGroup,
} from "../ProjectFiltersForm";

import { getUserSummaries } from "@/lib/queries/user";
import { getCustomerSummaries } from "@/lib/queries/customers";
import { getProjectCategorySummaries } from "@/lib/queries/project";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function ProjectFiltersFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const categories = await getProjectCategorySummaries(workspaceId);
  const customers = await getCustomerSummaries(workspaceId);
  const users = await getUserSummaries(workspaceId);

  return (
    <ProjectFiltersForm
      projectStatusCheckboxGroup={<ProjectFiltersFormStatusCheckboxGroup />}
      userCheckboxGroup={<ProjectFiltersFormUserCheckboxGroup users={users} />}
      projectCategoryCheckboxGroup={
        <ProjectFiltersFormCategoryCheckboxGroup categories={categories} />
      }
      customerCheckboxGroup={
        <ProjectFiltersFormCustomerCheckboxGroup customers={customers} />
      }
    />
  );
}
