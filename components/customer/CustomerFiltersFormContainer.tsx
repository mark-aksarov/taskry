import "server-only";

import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "./CustomerFiltersForm";

import { Suspense } from "react";
import { CustomerFilters } from "@/lib/types";
import { CustomerFiltersProvider } from "./CustomerFiltersContext";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { CustomerFiltersFormCompanyCheckboxGroup } from "./CustomerFiltersFormCompanyCheckboxGroup";

interface CustomerFiltersFormContainerProps {
  filters?: CustomerFilters;
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
    <CustomerFiltersProvider initialFilters={filters}>
      <CustomerFiltersForm
        companyCheckboxGroup={
          <CustomerFiltersFormCompanyCheckboxGroup companies={companies} />
        }
      />
    </CustomerFiltersProvider>
  );
}
