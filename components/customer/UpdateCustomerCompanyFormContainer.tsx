"use client";

import {
  UpdateCustomerCompanyForm,
  UpdateCustomerCompanyFormSkeleton,
} from "./UpdateCustomerCompanyForm";

import useSWR from "swr";
import { CompanySummaryDTO } from "@/lib/data/company/company.dto";
import { CustomerFormDataDTO } from "@/lib/data/customer/customer.dto";

interface UpdateCustomerCompanyFormContainerProps {
  customerId: number;
}

export function UpdateCustomerCompanyFormContainer({
  customerId,
}: UpdateCustomerCompanyFormContainerProps) {
  const { data: companies } = useSWR<CompanySummaryDTO[]>(`/api/companies`);

  const {
    data: customer,
    error: customerError,
    isValidating,
  } = useSWR<CustomerFormDataDTO>(`/api/customers/${customerId}?view=edit`, {
    // disable revalidation on focus to prevent UI flicker caused by isValidating
    revalidateOnFocus: false,
  });

  if (customerError) {
    throw new Error();
  }

  // Show skeleton while loading
  // or revalidating to prevent stale data rendering
  const showSkeleton = !companies || !customer || isValidating;

  if (showSkeleton) {
    return <UpdateCustomerCompanyFormSkeleton />;
  }

  return (
    <UpdateCustomerCompanyForm
      customerId={customerId}
      companyId={customer?.companyId}
      companySelectItems={companies}
    />
  );
}
