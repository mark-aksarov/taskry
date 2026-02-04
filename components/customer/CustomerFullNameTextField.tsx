"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerFullNameTextFieldProps {
  defaultValue?: string;
}

export function CustomerFullNameTextField({
  defaultValue,
}: CustomerFullNameTextFieldProps) {
  const t = useTranslations("customers.CustomerFullNameTextField");

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
