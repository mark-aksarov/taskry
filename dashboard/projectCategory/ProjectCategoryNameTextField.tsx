"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface ProjectCategoryNameTextFieldProps {
  defaultValue?: string;
}

export function ProjectCategoryNameTextField({
  defaultValue,
}: ProjectCategoryNameTextFieldProps) {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoryNameTextField",
  );

  return (
    <TextField
      data-test="project-category-name-field"
      name="name"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      maxLength={255}
      isRequired
    />
  );
}
