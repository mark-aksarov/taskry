"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface ClientEmailTextFieldProps {
  defaultValue?: string;
}

export function ClientEmailTextField({
  defaultValue,
}: ClientEmailTextFieldProps) {
  const t = useTranslations("dashboard.clients.ClientEmailTextField");

  return (
    <TextField
      data-test="client-email-field"
      name="email"
      label={t("label")}
      placeholder={t("placeholder")}
      maxLength={254}
      type="email"
      errorMessage={(validation) => {
        const details = validation.validationDetails;
        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.typeMismatch) {
          return t("validation.format");
        }
        return "";
      }}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
