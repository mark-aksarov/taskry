"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateCompany } from "./UpdateCompanyContext";
import { CompanyNameTextField } from "./CompanyNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface EditCompanyFormProps {
  companyId: number;
  nameDefaultValue: string;
}

export function UpdateCompanyForm({
  companyId,
  nameDefaultValue,
}: EditCompanyFormProps) {
  const t = useTranslations("company.UpdateCompanyForm");

  const { state, isPending, action } = useUpdateCompany();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-company-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={companyId} />
        <CompanyNameTextField defaultValue={nameDefaultValue} />
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
