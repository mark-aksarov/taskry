import "server-only";

import {
  CustomerFormBase,
  CustomerFormBaseSkeleton,
  CustomerFormBaseCompanySelect,
} from "./CustomerFormBase";

import { Suspense } from "react";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { getCompanySummaries } from "@/lib/data/company/company.service";

export function NewCustomerFormContainer() {
  return (
    <Suspense fallback={<CustomerFormBaseSkeleton />}>
      <NewCustomerFormContainerInner />
    </Suspense>
  );
}

async function NewCustomerFormContainerInner() {
  const companies = await getCompanySummaries();

  return (
    <CustomerFormBase
      formId="new-customer-form"
      companySelect={<CustomerFormBaseCompanySelect companies={companies} />}
      formAction={createCustomer}
    />
  );
}
