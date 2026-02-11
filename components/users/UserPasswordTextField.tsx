"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

export function UserPasswordTextField() {
  const t = useTranslations("users.UserPasswordTextField");

  return (
    <TextField
      data-test="user-password-field"
      name="password"
      type="password"
      label={t("password.label")}
      placeholder={t("password.placeholder")}
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

        return "";
      }}
    />
  );
}
