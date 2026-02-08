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
      fullNameDefaultValue={customer.fullName}
      bioDefaultValue={customer.bio}
      emailDefaultValue={customer.email}
      phoneNumberDefaultValue={customer.phoneNumber}
      publicLinkDefaultValue={customer.publicLink}
      companySelect={
        <CustomerCompanySelect
          defaultSelectedKey={customer.companyId?.toString()}
          companies={companies}
        />
      }
      updateCustomer={updateCustomer}
    />
  );
}
