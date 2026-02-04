"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface ProjectTitleTextFieldProps {
  defaultValue?: string;
}

export function ProjectTitleTextField({
  defaultValue,
}: ProjectTitleTextFieldProps) {
  const t = useTranslations("projects.ProjectTitleTextField");

  return (
    <TextField
      name="title"
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
