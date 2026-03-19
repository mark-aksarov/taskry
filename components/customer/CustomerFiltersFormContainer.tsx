import "server-only";

import {
  CustomerFiltersForm,
  CustomerFiltersFormSkeleton,
} from "./CustomerFiltersForm";

import { Suspense } from "react";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export function CustomerFiltersFormContainer() {
  return (
    <Suspense fallback={<CustomerFiltersFormSkeleton />}>
      <CustomerFiltersFormContainerInner />
    </Suspense>
  );
}

async function CustomerFiltersFormContainerInner() {
  const companies = await getCompanySummaries();

  return <CustomerFiltersForm companyCheckboxGroupItems={companies} />;
}
