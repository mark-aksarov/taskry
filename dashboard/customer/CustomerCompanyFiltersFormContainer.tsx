import "server-only";

import {
  CustomerCompanyFiltersForm,
  CustomerCompanyFiltersFormSkeleton,
} from "./CustomerCompanyFiltersForm";

import { Suspense } from "react";
import { getCompanies } from "@/lib/data/company/company.dal";

export function CustomerCompanyFiltersFormContainer() {
  return (
    <Suspense fallback={<CustomerCompanyFiltersFormSkeleton />}>
      <CustomerCompanyFiltersFormContainerInner />
    </Suspense>
  );
}

async function CustomerCompanyFiltersFormContainerInner() {
  const companies = await getCompanies();

  return <CustomerCompanyFiltersForm companyCheckboxGroupItems={companies} />;
}
