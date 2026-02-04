"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

export function ForgetPasswordFormEmailField() {
  const t = useTranslations("auth.ForgetPasswordFormEmailField");

  return (
    <TextField
      label={t("label")}
      type="email"
      placeholder={t("placeholder")}
      isRequired
      maxLength={254}
      name="email"
      errorMessage={(validation) => {
        const details = validation.validationDetails;

        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooLong) {
          return t("validation.tooLong", { maxLength: 254 });
        }
        if (details.typeMismatch) {
          return t("validation.format");
        }

        return "";
      }}
    />
  );
}
