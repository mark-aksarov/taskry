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
  const { data: companies } = useSWR<CompanySummaryDTO[]>(`/api/companies`, {
    revalidateOnFocus: false,
  });

  const {
    data: customer,
    error: customerError,
    isValidating: isValidatingCustomer,
  } = useSWR<CustomerFormDataDTO>(`/api/customers/${customerId}?view=edit`, {
    revalidateOnFocus: false,
  });

  if (customerError) {
    throw new Error();
  }

  // Show skeleton while loading or revalidating
  const showSkeleton = !companies || !customer || isValidatingCustomer;

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
