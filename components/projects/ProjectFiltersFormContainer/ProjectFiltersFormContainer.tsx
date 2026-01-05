import {
  ProjectFiltersForm,
  ProjectFiltersFormUserCheckboxGroup,
  ProjectFiltersFormStatusCheckboxGroup,
  ProjectFiltersFormCategoryCheckboxGroup,
  ProjectFiltersFormCustomerCheckboxGroup,
} from "../ProjectFiltersForm";

import { ProjectFilters } from "@/lib/types";
import { getUserSummaries } from "@/lib/data/user/user.service";
import { getCustomerSummaries } from "@/lib/data/customer/customer.service";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.service";

interface ProjectFiltersFormContainerProps {
  filters: ProjectFilters;
}

export async function ProjectFiltersFormContainer({
  filters,
}: ProjectFiltersFormContainerProps) {
  const categories = await getProjectCategorySummaries();
  const customers = await getCustomerSummaries();
  const users = await getUserSummaries();

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
      filters={filters}
    />
  );
}
