"use client";

import useSWR from "swr";
import { EditCustomerForm } from "./EditCustomerForm";
import { CustomerFormBaseCompanySelect } from "./CustomerFormBase";
import { CompanySummaryDTO } from "@/lib/data/company/company.dto";
import { CustomerFormDataDTO } from "@/lib/data/customer/customer.dto";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";

export function EditCustomerFormClientContainer({
  customerId,
}: {
  customerId: number;
}) {
  const { data: companies } = useSWR<CompanySummaryDTO[]>(`/api/companies`, {
    suspense: true,
  });

  const { data: customer } = useSWR<CustomerFormDataDTO>(
    `/api/customers/${customerId}?view=edit`,
    {
      suspense: true,
    },
  );

  if (!companies || !customer) return null;

  return (
    <EditCustomerForm
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
