import "server-only";

import {
  CompanyFiltersForm,
  CompanyFiltersFormSkeleton,
} from "./CompanyFiltersForm";

import { Suspense } from "react";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export function CompanyFiltersFormContainer() {
  return (
    <Suspense fallback={<CompanyFiltersFormSkeleton />}>
      <CompanyFiltersFormContainerInner />
    </Suspense>
  );
}

async function CompanyFiltersFormContainerInner() {
  const companies = await getCompanySummaries();

  return <CompanyFiltersForm companyCheckboxGroupItems={companies} />;
}
