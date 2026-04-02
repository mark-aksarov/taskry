"use client";

import useSWR from "swr";
import { UpdateCustomerForm } from "./UpdateCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { CompanySummaryDTO } from "@/lib/data/company/company.dto";
import { CustomerFormDataDTO } from "@/lib/data/customer/customer.dto";

interface UpdateCustomerFormContainerProps {
  customerId: number;
}

export function UpdateCustomerFormContainer({
  customerId,
}: UpdateCustomerFormContainerProps) {
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
    return <CustomerFormSkeleton />;
  }

  return (
    <UpdateCustomerForm
      customerId={customerId}
      fullName={customer.fullName}
      bio={customer.bio}
      email={customer.email}
      phoneNumber={customer.phoneNumber}
      publicLink={customer.publicLink}
      companyId={customer?.companyId}
      companySelectItems={companies}
    />
  );
}
