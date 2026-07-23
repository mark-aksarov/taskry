"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface ClientPhoneNumberTextFieldProps {
  defaultValue?: string;
}

export function ClientPhoneNumberTextField({
  defaultValue,
}: ClientPhoneNumberTextFieldProps) {
  const t = useTranslations("dashboard.clients.ClientPhoneNumberTextField");

  return (
    <TextField
      data-test="client-phone-number-field"
      name="phoneNumber"
      label={t("label")}
      placeholder={t("placeholder")}
      type="tel"
      maxLength={20}
      defaultValue={defaultValue}
    />
  );
}
