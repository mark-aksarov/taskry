"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserPhoneNumberTextFieldProps {
  defaultValue?: string;
}

export function UserPhoneNumberTextField({
  defaultValue,
}: UserPhoneNumberTextFieldProps) {
  const t = useTranslations("users.UserPhoneNumberTextField");

  return (
    <TextField
      data-test="user-phone-number-field"
      name="phoneNumber"
      label={t("label")}
      placeholder={t("placeholder")}
      type="tel"
      maxLength={20}
      defaultValue={defaultValue}
    />
  );
}
