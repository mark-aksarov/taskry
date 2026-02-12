"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface TaskCategoryNameTextFieldProps {
  defaultValue?: string;
}

export function TaskCategoryNameTextField({
  defaultValue,
}: TaskCategoryNameTextFieldProps) {
  const t = useTranslations("taskCategories.TaskCategoryNameTextField");

  return (
    <TextField
      data-test="task-category-name-field"
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
