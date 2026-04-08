"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface SubtaskTextFieldProps {
  defaultValue?: string;
}

export function SubtaskTextField({ defaultValue }: SubtaskTextFieldProps) {
  const t = useTranslations("subtasks.SubtaskTextField");

  return (
    <TextField
      name="text"
      label={t("label")}
      data-test="subtask-text-field"
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
