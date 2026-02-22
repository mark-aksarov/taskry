import "server-only";

import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
  ProjectFiltersFormStatusCheckboxGroup,
} from "../ProjectFiltersForm";

import { Suspense } from "react";
import { ProjectFilters } from "@/lib/types";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { ProjectFiltersProvider } from "../ProjectFiltersContext";
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
    <ProjectFiltersProvider initialFilters={filters}>
      <ProjectFiltersForm
        projectStatusCheckboxGroup={<ProjectFiltersFormStatusCheckboxGroup />}
        userCheckboxGroup={
          <ProjectFiltersFormUserCheckboxGroup users={users} />
        }
        projectCategoryCheckboxGroup={
          <ProjectFiltersFormCategoryCheckboxGroup categories={categories} />
        }
        customerCheckboxGroup={
          <ProjectFiltersFormCustomerCheckboxGroup customers={customers} />
        }
      />
    </ProjectFiltersProvider>
  );
}
