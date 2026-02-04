"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

export function SignInFormPasswordField() {
  const t = useTranslations("auth.SignInFormPasswordField");

  return (
    <TextField
      label={t("label")}
      type="password"
      placeholder={t("placeholder")}
      name="password"
      isRequired
      errorMessage={(validation) => {
        const details = validation.validationDetails;

        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooShort) {
          return t("validation.tooShort", { minLength: 8 });
        }
        if (details.tooLong) {
          return t("validation.tooLong", { maxLength: 128 });
        }

        return "";
      }}
    />
  );
}
