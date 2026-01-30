"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface SubtaskFormBaseTextFieldProps {
  defaultValue?: string;
}

export function SubtaskFormBaseTextField({
  defaultValue,
}: SubtaskFormBaseTextFieldProps) {
  const t = useTranslations("subtasks.SubtaskFormBaseTextField");

  return (
    <TextField
      name="text"
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
