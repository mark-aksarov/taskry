import {
  ProjectFiltersForm,
  ProjectFiltersFormUserCheckboxGroup,
  ProjectFiltersFormStatusCheckboxGroup,
  ProjectFiltersFormCategoryCheckboxGroup,
  ProjectFiltersFormCustomerCheckboxGroup,
} from "../ProjectFiltersForm";

import { getUserSummaries } from "@/lib/dal/user";
import { getCustomerSummaries } from "@/lib/dal/customers";
import { getProjectCategorySummaries } from "@/lib/dal/project";
import { ProjectFilters } from "@/lib/dto/filters/projectFilters";

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
