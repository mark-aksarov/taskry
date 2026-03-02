"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreateCompany } from "./CreateCompanyContext";
import { CompanyNameTextField } from "./CompanyNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export function NewCompanyForm() {
  const t = useTranslations("company.NewCompanyForm");

  const { state, action, isPending } = useCreateCompany();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-company-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CompanyNameTextField />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>

      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
