"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { useUpdateCompany } from "../UpdateCompanyContext";
import { CompanyNameTextField } from "../CompanyNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface UpdateCompanyFormProps {
  companyId: number;
  nameDefaultValue: string;
}

export function UpdateCompanyForm({
  companyId,
  nameDefaultValue,
}: UpdateCompanyFormProps) {
  const { state, isPending, action } = useUpdateCompany();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-company-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={companyId} />
      <CompanyNameTextField defaultValue={nameDefaultValue} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
