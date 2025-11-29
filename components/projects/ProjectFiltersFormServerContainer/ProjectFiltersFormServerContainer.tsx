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

export async function ProjectFiltersFormServerContainer() {
  const categories = await getProjectCategorySummaries(1);
  const customers = await getCustomerSummaries(1);
  const users = await getUserSummaries(1);

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
