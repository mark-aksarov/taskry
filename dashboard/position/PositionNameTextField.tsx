"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface PositionNameTextFieldProps {
  defaultValue?: string;
}

export function PositionNameTextField({
  defaultValue,
}: PositionNameTextFieldProps) {
  const t = useTranslations("dashboard.positions.PositionNameTextField");

  return (
    <TextField
      name="name"
      data-test="position-name-field"
      maxLength={255}
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
