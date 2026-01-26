"use client";

import {
  CustomerFormBase,
  CustomerFormBaseSkeleton,
  CustomerFormBaseCompanySelect,
} from "./CustomerFormBase";

import useSWR from "swr";
import { Suspense } from "react";
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
    <Suspense fallback={<CustomerFormBaseSkeleton />}>
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
    <CustomerFormBase
      formId="edit-customer-form"
      customerId={customerId}
      fullNameDefaultValue={customer.fullName}
      bioDefaultValue={customer.bio ?? ""}
      emailDefaultValue={customer.email}
      phoneNumberDefaultValue={customer.phoneNumber ?? ""}
      publicLinkDefaultValue={customer.publicLink ?? ""}
      companySelect={
        <CustomerFormBaseCompanySelect
          defaultSelectedKey={customer.companyId.toString()}
          companies={companies}
        />
      }
      formAction={updateCustomer}
    />
  );
}
