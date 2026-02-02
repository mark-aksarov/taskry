"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserFormBasePhoneNumberTextFieldProps {
  defaultValue?: string;
}

export function UserFormBasePhoneNumberTextField({
  defaultValue,
}: UserFormBasePhoneNumberTextFieldProps) {
  const t = useTranslations("users.UserFormBasePhoneNumberTextField");

  return (
    <TextField
      name="phoneNumber"
      label={t("label")}
      placeholder={t("placeholder")}
      type="tel"
      maxLength={255}
      defaultValue={defaultValue}
    />
  );
}
