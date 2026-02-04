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
