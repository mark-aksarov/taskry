import {
  ProjectFiltersForm,
  ProjectFiltersFormUserCheckboxGroup,
  ProjectFiltersFormCategoryCheckboxGroup,
  ProjectFiltersFormCustomerCheckboxGroup,
  ProjectFiltersFormStatusCheckboxGroup,
} from "../ProjectFiltersForm";
import { getCustomerSummaries } from "@/lib/queries/customers";
import { getUserSummaries } from "@/lib/queries/user";
import {
  getProjectCategorySummaries,
  getProjectSummarySummaries,
} from "@/lib/queries/project";

export async function ProjectFiltersFormServerContainer() {
  const categories = await getProjectCategorySummaries(1);
  const customers = await getCustomerSummaries(1);
  const users = await getUserSummaries(1);
  const statuses = await getProjectSummarySummaries();

  return (
    <ProjectFiltersForm
      projectStatusCheckboxGroup={
        <ProjectFiltersFormStatusCheckboxGroup
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
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
