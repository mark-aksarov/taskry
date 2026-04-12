"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { CompanySelect } from "@/components/company/CompanySelect";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateCustomerCompany } from "../UpdateCustomerCompanyContext";

export interface UpdateCustomerCompanyFormProps {
  customerId: number;
  companyId?: number;
  companySelectItems: { id: number; name: string }[];
}

export function UpdateCustomerCompanyForm({
  customerId,
  companyId,
  companySelectItems,
}: UpdateCustomerCompanyFormProps) {
  const { state, action, isPending } = useUpdateCustomerCompany();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-customer-company-form" onSubmit={handleSubmit}>
      {customerId && <input type="hidden" name="id" value={customerId} />}
      <CompanySelect
        defaultSelectedKey={companyId?.toString()}
        items={companySelectItems}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
