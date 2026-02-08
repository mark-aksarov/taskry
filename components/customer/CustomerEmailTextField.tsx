"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerEmailTextFieldProps {
  defaultValue?: string;
}

export function CustomerEmailTextField({
  defaultValue,
}: CustomerEmailTextFieldProps) {
  const t = useTranslations("customers.CustomerEmailTextField");

  return (
    <TextField
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
