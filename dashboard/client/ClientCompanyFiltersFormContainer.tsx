import "server-only";

import {
  ClientCompanyFiltersForm,
  ClientCompanyFiltersFormSkeleton,
} from "./ClientCompanyFiltersForm";

import { Suspense } from "react";
import { getCompanies } from "@/lib/data/company/company.dal";

export function ClientCompanyFiltersFormContainer() {
  return (
    <Suspense fallback={<ClientCompanyFiltersFormSkeleton />}>
      <ClientCompanyFiltersFormContainerInner />
    </Suspense>
  );
}

async function ClientCompanyFiltersFormContainerInner() {
  const companies = await getCompanies();

  return <ClientCompanyFiltersForm companyCheckboxGroupItems={companies} />;
}
