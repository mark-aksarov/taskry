import "server-only";

import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
  ProjectFiltersFormStatusCheckboxGroup,
} from "../ProjectFiltersForm";

import { Suspense } from "react";
import { ProjectFilters } from "@/lib/types";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectFiltersFormUserCheckboxGroup } from "../ProjectFiltersFormUserCheckboxGroup";
import { ProjectFiltersFormCategoryCheckboxGroup } from "../ProjectFiltersFormCategoryCheckboxGroup";
import { ProjectFiltersFormCustomerCheckboxGroup } from "../ProjectFiltersFormCustomerCheckboxGroup";

interface ProjectFiltersFormContainerProps {
  filters?: ProjectFilters;
}

export function ProjectFiltersFormContainer(
  props: ProjectFiltersFormContainerProps,
) {
  return (
    <Suspense fallback={<ProjectFiltersFormSkeleton />}>
      <ProjectFiltersFormContainerInner {...props} />
    </Suspense>
  );
}

async function ProjectFiltersFormContainerInner({
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
