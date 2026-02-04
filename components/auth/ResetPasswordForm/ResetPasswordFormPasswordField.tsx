"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

export function ResetPasswordFormPasswordField() {
  const t = useTranslations("auth.ResetPasswordFormPasswordField");

  return (
    <TextField
      label={t("label")}
      type="password"
      name="password"
      placeholder={t("placeholder")}
      isRequired
      minLength={8}
      maxLength={128}
      errorMessage={(validation) => {
        const details = validation.validationDetails;

        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooShort) {
          return t("validation.tooShort", { minLength: 8 });
        }
        if (details.tooLong) {
          return t("validation.tooLong", { minLength: 128 });
        }

        return "";
      }}
    />
  );
}
