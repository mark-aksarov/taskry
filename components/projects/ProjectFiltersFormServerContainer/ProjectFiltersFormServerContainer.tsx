import {
  ProjectFiltersForm,
  ProjectFiltersFormUserCheckboxGroup,
  ProjectFiltersFormStatusCheckboxGroup,
  ProjectFiltersFormCategoryCheckboxGroup,
  ProjectFiltersFormCustomerCheckboxGroup,
} from "../ProjectFiltersForm";

import { getUserSummaries } from "@/lib/data/user/user.dal";
import { ProjectFilters } from "@/lib/data/project/project.dto";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

interface ProjectFiltersFormServerContainerProps {
  filters: ProjectFilters;
}

export async function ProjectFiltersFormServerContainer({
  filters,
}: ProjectFiltersFormServerContainerProps) {
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
