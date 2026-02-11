"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface ProjectCategoryNameTextFieldProps {
  defaultValue?: string;
}

export function ProjectCategoryNameTextField({
  defaultValue,
}: ProjectCategoryNameTextFieldProps) {
  const t = useTranslations("projectCategories.ProjectCategoryNameTextField");

  return (
    <TextField
      data-test="project-category-name-field"
      name="name"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
