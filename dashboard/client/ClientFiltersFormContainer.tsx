import "server-only";

import {
  ClientFiltersForm,
  ClientFiltersFormSkeleton,
} from "./ClientFiltersForm";

import { Suspense } from "react";
import { getCompanies } from "@/lib/data/company/company.dal";

export function ClientFiltersFormContainer() {
  return (
    <Suspense fallback={<ClientFiltersFormSkeleton />}>
      <ClientFiltersFormContainerInner />
    </Suspense>
  );
}

async function ClientFiltersFormContainerInner() {
  const companies = await getCompanies();

  return <ClientFiltersForm companyCheckboxGroupItems={companies} />;
}
