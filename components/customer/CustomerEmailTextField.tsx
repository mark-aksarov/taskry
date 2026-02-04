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
      type="email"
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
