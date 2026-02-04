"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

export function SignUpFormEmailField() {
  const t = useTranslations("auth.SignUpFormEmailField");

  return (
    <TextField
      label={t("label")}
      type="email"
      name="email"
      placeholder={t("placeholder")}
      isRequired
      maxLength={254}
      errorMessage={(validation) => {
        const details = validation.validationDetails;

        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooLong) {
          return t("validation.tooLong", { minLength: 254 });
        }
        if (details.typeMismatch) {
          return t("validation.format");
        }

        return "";
      }}
    />
  );
}
