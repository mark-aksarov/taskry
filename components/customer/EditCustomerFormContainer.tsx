"use client";

import useSWR from "swr";
import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
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
  const pathname = usePathname();

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
    if (pathname === "/customers") {
      if (customerError.status === 404) {
        throw new Error(undefined, { cause: "notFound" });
      }

      throw new Error();
    }

    notFound();
  }

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
