"use client";

import useSWR from "swr";
import { usePathname } from "@/i18n/navigation";
import { EditCustomerForm } from "./EditCustomerForm";
import { notFound, useParams } from "next/navigation";
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
  const params = useParams();

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
    if (customerError.status === 404) {
      if (pathname.startsWith("/customers") && params.id) {
        notFound();
      }

      throw new Error(undefined, { cause: "customerNotFound" });
    }

    throw new Error();
  }

  // Show skeleton while loading or revalidating
  const showSkeleton = !companies || !customer || isValidatingCustomer;

  if (showSkeleton) {
    return <CustomerFormSkeleton />;
  }

  return (
    <EditCustomerForm
      customerId={customerId}
      fullName={customer.fullName}
      bio={customer.bio}
      email={customer.email}
      phoneNumber={customer.phoneNumber}
      publicLink={customer.publicLink}
      companyId={customer?.companyId}
      customerCompanySelectItems={companies}
    />
  );
}
