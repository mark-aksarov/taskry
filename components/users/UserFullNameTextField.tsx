"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserFullNameTextFieldProps {
  defaultValue?: string;
}

export function UserFullNameTextField({
  defaultValue,
}: UserFullNameTextFieldProps) {
  const t = useTranslations("users.UserFullNameTextField");

  return (
    <TextField
      data-test="user-full-name-field"
      name="fullName"
      maxLength={255}
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
