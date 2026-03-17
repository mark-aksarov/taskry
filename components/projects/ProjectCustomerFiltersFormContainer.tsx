import "server-only";

import {
  ProjectCustomerFiltersForm,
  ProjectCustomerFiltersFormSkeleton,
} from "./ProjectCustomerFiltersForm";

import { Suspense } from "react";
import { getCustomerSummaries } from "@/lib/data/customer/customer.dal";

export function ProjectCustomerFiltersFormContainer() {
  return (
    <Suspense fallback={<ProjectCustomerFiltersFormSkeleton />}>
      <ProjectCustomerFiltersFormContainerInner />
    </Suspense>
  );
}

async function ProjectCustomerFiltersFormContainerInner() {
  const customers = await getCustomerSummaries();

  return <ProjectCustomerFiltersForm customerCheckboxGroupItems={customers} />;
}
