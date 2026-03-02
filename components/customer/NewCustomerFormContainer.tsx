import "server-only";

import { Suspense } from "react";
import { NewCustomerForm } from "./NewCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { getCompanySummaries } from "@/lib/data/company/company.dal";

export function NewCustomerFormContainer() {
  return (
    <Suspense fallback={<CustomerFormSkeleton />}>
      <NewCustomerFormContainerInner />
    </Suspense>
  );
}

async function NewCustomerFormContainerInner() {
  const companies = await getCompanySummaries();

  return <NewCustomerForm companySelectItems={companies} />;
}
