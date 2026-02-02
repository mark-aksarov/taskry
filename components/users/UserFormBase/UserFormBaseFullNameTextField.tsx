"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserFormBaseFullNameTextFieldProps {
  defaultValue?: string;
}

export function UserFormBaseFullNameTextField({
  defaultValue,
}: UserFormBaseFullNameTextFieldProps) {
  const t = useTranslations("users.UserFormBaseFullNameTextField");

  return (
    <TextField
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
