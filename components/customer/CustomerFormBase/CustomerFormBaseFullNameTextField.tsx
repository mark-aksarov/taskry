"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerFormBaseFullNameTextFieldProps {
  defaultValue?: string;
}

export function CustomerFormBaseFullNameTextField({
  defaultValue,
}: CustomerFormBaseFullNameTextFieldProps) {
  const t = useTranslations("customers.CustomerFormBaseFullNameTextField");

  return (
    <TextField
      name="fullName"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={(validation) => {
        const details = validation.validationDetails;
        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooLong) {
          return t("validation.tooLong", { maxLength: 255 });
        }
        return "";
      }}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
