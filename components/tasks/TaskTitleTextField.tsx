"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface TaskTitleTextFieldProps {
  defaultValue?: string;
}

export function TaskTitleTextField({ defaultValue }: TaskTitleTextFieldProps) {
  const t = useTranslations("tasks.TaskTitleTextField");

  return (
    <TextField
      data-test="task-title-field"
      name="title"
      label={t("label")}
      placeholder={t("placeholder")}
      isRequired
      maxLength={255}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
    />
  );
}
