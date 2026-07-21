import "server-only";

import { Suspense } from "react";
import { CreateCustomerForm } from "./CreateCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { getCompanies } from "@/lib/data/company/company.dal";

export function CreateCustomerFormContainer() {
  return (
    <Suspense fallback={<CustomerFormSkeleton />}>
      <CreateCustomerFormContainerInner />
    </Suspense>
  );
}

async function CreateCustomerFormContainerInner() {
  const companies = await getCompanies();

  return <CreateCustomerForm companySelectItems={companies} />;
}
