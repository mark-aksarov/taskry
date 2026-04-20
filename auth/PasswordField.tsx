"use client";

import { useTranslations } from "next-intl";
import { TextField, TextFieldProps } from "@/ui/TextField";

export function PasswordField({
  minLength,
  maxLength,
}: Pick<TextFieldProps, "minLength" | "maxLength">) {
  const t = useTranslations("auth.PasswordField");

  return (
    <TextField
      label={t("label")}
      type="password"
      name="password"
      placeholder={t("placeholder")}
      isRequired
      minLength={minLength}
      maxLength={maxLength}
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
