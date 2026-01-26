import "server-only";

import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "./CustomerFiltersForm";

import { Suspense } from "react";
import { CustomerFilters } from "@/lib/types";
import { getCompanySummaries } from "@/lib/data/company/company.service";
import { CustomerFiltersFormCompanyCheckboxGroup } from "./CustomerFiltersForm";

interface CustomerFiltersFormContainerProps {
  filters: CustomerFilters;
}

export function CustomerFiltersFormContainer(
  props: CustomerFiltersFormContainerProps,
) {
  return (
    <Suspense fallback={<CustomerFiltersFormSkeleton />}>
      <CustomerFiltersFormContainerInner {...props} />
    </Suspense>
  );
}

async function CustomerFiltersFormContainerInner({
  filters,
}: CustomerFiltersFormContainerProps) {
  const companies = await getCompanySummaries();

  return (
    <CustomerFiltersForm
      filters={filters}
      companyCheckboxGroup={
        <CustomerFiltersFormCompanyCheckboxGroup
          filters={filters}
          companies={companies}
        />
      }
    />
  );
}
