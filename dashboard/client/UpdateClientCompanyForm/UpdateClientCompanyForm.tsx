"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { CompanySelect } from "@/dashboard/company/CompanySelect";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateClientCompany } from "../UpdateClientCompanyContext";

export interface UpdateClientCompanyFormProps {
  clientId: number;
  companyId?: number;
  companySelectItems: { id: number; name: string }[];
}

export function UpdateClientCompanyForm({
  clientId,
  companyId,
  companySelectItems,
}: UpdateClientCompanyFormProps) {
  const { state, action, isPending } = useUpdateClientCompany();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-client-company-form" onSubmit={handleSubmit}>
      {clientId && <input type="hidden" name="id" value={clientId} />}
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
