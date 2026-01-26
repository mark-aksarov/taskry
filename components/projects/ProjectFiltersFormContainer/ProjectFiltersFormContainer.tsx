import "server-only";

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
      projectStatusCheckboxGroup={
        <ProjectFiltersFormStatusCheckboxGroup filters={filters} />
      }
      userCheckboxGroup={
        <ProjectFiltersFormUserCheckboxGroup filters={filters} users={users} />
      }
      projectCategoryCheckboxGroup={
        <ProjectFiltersFormCategoryCheckboxGroup
          filters={filters}
          categories={categories}
        />
      }
      customerCheckboxGroup={
        <ProjectFiltersFormCustomerCheckboxGroup
          filters={filters}
          customers={customers}
        />
      }
      filters={filters}
    />
  );
}
