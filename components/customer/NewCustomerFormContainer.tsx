import "server-only";

import { Suspense } from "react";
import { NewCustomerForm } from "./NewCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { CustomerCompanySelect } from "./CustomerCompanySelect";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { createCustomer } from "@/lib/actions/customer/createCustomer";

export function NewCustomerFormContainer() {
  return (
    <Suspense fallback={<CustomerFormSkeleton />}>
      <NewCustomerFormContainerInner />
    </Suspense>
  );
}

async function NewCustomerFormContainerInner() {
  const companies = await getCompanySummaries();

  return (
    <NewCustomerForm
      companySelect={<CustomerCompanySelect companies={companies} />}
      createCustomer={createCustomer}
    />
  );
}
