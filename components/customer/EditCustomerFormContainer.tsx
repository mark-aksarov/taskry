"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { EditCustomerForm } from "./EditCustomerForm";
import { CustomerFormSkeleton } from "./CustomerFormSkeleton";
import { CustomerCompanySelect } from "./CustomerCompanySelect";
import { CompanySummaryDTO } from "@/lib/data/company/company.dto";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { CustomerFormDataDTO } from "@/lib/data/customer/customer.dto";

interface EditCustomerFormContainerProps {
  customerId: number;
}

export function EditCustomerFormContainer(
  props: EditCustomerFormContainerProps,
) {
  return (
    <Suspense fallback={<CustomerFormSkeleton />}>
      <EditCustomerFormContainerInner {...props} />
    </Suspense>
  );
}

function EditCustomerFormContainerInner({
  customerId,
}: EditCustomerFormContainerProps) {
  const { data: companies } = useSWR<CompanySummaryDTO[]>(`/api/companies`, {
    suspense: true,
  });

  const { data: customer } = useSWR<CustomerFormDataDTO>(
    `/api/customers/${customerId}?view=edit`,
    {
      suspense: true,
    },
  );

  if (!companies || !customer) {
    throw new Error("Customer not found");
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
      updateCustomer={updateCustomer}
    />
  );
}
