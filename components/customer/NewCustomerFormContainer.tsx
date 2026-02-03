import "server-only";

import {
  CustomerFormBaseSkeleton,
  CustomerFormBaseCompanySelect,
} from "./CustomerFormBase";

import { Suspense } from "react";
import { NewCustomerForm } from "./NewCustomerForm";
import { getCompanySummaries } from "@/lib/data/company/company.dal";
import { createCustomer } from "@/lib/actions/customer/createCustomer";

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
    <NewCustomerForm
      companySelect={<CustomerFormBaseCompanySelect companies={companies} />}
      formAction={createCustomer}
    />
  );
}
