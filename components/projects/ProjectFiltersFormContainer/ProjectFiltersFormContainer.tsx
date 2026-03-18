import "server-only";

import {
  ProjectFiltersForm,
  ProjectFiltersFormSkeleton,
} from "../ProjectFiltersForm";

import { Suspense } from "react";
import { ProjectFilters } from "@/lib/types";
import { getUserSummaries } from "@/lib/data/user/user.dal";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";
import { getProjectCategorySummaries } from "@/lib/data/projectCategory/projectCategory.dal";

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
      userCheckboxGroupItems={users}
      categoryCheckboxGroupItems={categories}
      customerCheckboxGroupItems={customers}
    />
  );
}
