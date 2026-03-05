"use client";

import useSWR from "swr";
import { EditCustomerForm } from "./EditCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { CompanySummaryDTO } from "@/lib/data/company/company.dto";
import { CustomerFormDataDTO } from "@/lib/data/customer/customer.dto";

interface EditCustomerFormContainerProps {
  customerId: number;
}

export function EditCustomerFormContainer({
  customerId,
}: EditCustomerFormContainerProps) {
  const { data: companies } = useSWR<CompanySummaryDTO[]>(`/api/companies`, {
    revalidateIfStale: false, // don't revalidate on each mount
    revalidateOnFocus: false,
  });

  // Current customer data for editing (loaded each modal open)
  const { data: customer, isValidating: isValidatingCustomer } =
    useSWR<CustomerFormDataDTO>(`/api/customers/${customerId}?view=edit`);

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading or revalidating
  const showSkeleton = !companies || !customer || isValidatingCustomer;

  if (showSkeleton) {
    return <CustomerFormSkeleton />;
  }

  return (
    <EditCustomerForm
      customerId={customerId}
      customerFullNameDefaultValue={customer.fullName}
      customerBioDefaultValue={customer.bio}
      customerEmailDefaultValue={customer.email}
      customerPhoneNumberDefaultValue={customer.phoneNumber}
      customerPublicLinkDefaultValue={customer.publicLink}
      customerCompanyDefaultValue={customer?.companyId?.toString()}
      customerCompanySelectItems={companies}
    />
  );
}
