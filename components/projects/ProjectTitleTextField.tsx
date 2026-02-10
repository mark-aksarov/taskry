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
      data-test="project-title-field"
      name="title"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
