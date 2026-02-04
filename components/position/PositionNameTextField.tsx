"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface PositionNameTextFieldProps {
  defaultValue?: string;
}

export function PositionNameTextField({
  defaultValue,
}: PositionNameTextFieldProps) {
  const t = useTranslations("positions.PositionNameTextField");

  return (
    <TextField
      name="name"
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
