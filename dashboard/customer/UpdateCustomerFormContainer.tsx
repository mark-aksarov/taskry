"use client";

import useSWR from "swr";
import { UpdateCustomerForm } from "./UpdateCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { CompanyDTO } from "@/lib/data/company/company.dto";
import { CustomerDTO } from "@/lib/data/customer/customer.dto";

interface UpdateCustomerFormContainerProps {
  customerId: number;
}

export function UpdateCustomerFormContainer({
  customerId,
}: UpdateCustomerFormContainerProps) {
  const { data: companies } = useSWR<CompanyDTO[]>(`/api/companies`);

  const {
    data: customer,
    error: customerError,
    isValidating,
  } = useSWR<CustomerDTO>(`/api/customers/${customerId}?view=edit`, {
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
