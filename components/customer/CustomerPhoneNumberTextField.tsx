"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerPhoneNumberTextFieldProps {
  defaultValue?: string;
}

export function CustomerPhoneNumberTextField({
  defaultValue,
}: CustomerPhoneNumberTextFieldProps) {
  const t = useTranslations("customers.CustomerPhoneNumberTextField");

  return (
    <TextField
      data-test="customer-phone-number-field"
      name="phoneNumber"
      label={t("label")}
      placeholder={t("placeholder")}
      type="tel"
      maxLength={20}
      defaultValue={defaultValue}
    />
  );
}
