"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { useCreateCompany } from "../CreateCompanyContext";
import { CompanyNameTextField } from "../CompanyNameTextField";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export function CreateCompanyForm() {
  const { state, action, isPending } = useCreateCompany();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-company-form" onSubmit={handleSubmit}>
      <CompanyNameTextField />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
