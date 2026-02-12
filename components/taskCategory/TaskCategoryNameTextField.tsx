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
      errorMessage={t("validation.required")}
      maxLength={255}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
