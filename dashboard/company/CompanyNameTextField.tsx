"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface CompanyNameTextFieldProps {
  defaultValue?: string;
}

export function CompanyNameTextField({
  defaultValue,
}: CompanyNameTextFieldProps) {
  const t = useTranslations("dashboard.company.CompanyNameTextField");

  return (
    <TextField
      data-test="company-name-field"
      name="name"
      label={t("label")}
      placeholder={t("placeholder")}
      maxLength={255}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
