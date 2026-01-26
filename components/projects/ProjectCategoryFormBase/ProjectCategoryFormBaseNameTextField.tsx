"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface ProjectCategoryFormBaseNameTextFieldProps {
  defaultValue?: string;
}

export function ProjectCategoryFormBaseNameTextField({
  defaultValue,
}: ProjectCategoryFormBaseNameTextFieldProps) {
  const t = useTranslations("projects.ProjectCategoryFormBaseNameTextField");

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
