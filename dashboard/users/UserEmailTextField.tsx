"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface UserEmailTextFieldProps {
  defaultValue?: string;
}

export function UserEmailTextField({ defaultValue }: UserEmailTextFieldProps) {
  const t = useTranslations("dashboard.users.UserEmailTextField");

  return (
    <TextField
      data-test="user-email-field"
      name="email"
      label={t("label")}
      placeholder={t("placeholder")}
      type="email"
      autoComplete="off"
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
