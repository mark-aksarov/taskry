"use client";

import { useTranslations } from "next-intl";
import { TextField, TextFieldProps } from "@/ui/TextField";

type UserPasswordTextFieldProps = Pick<
  TextFieldProps,
  "name" | "label" | "placeholder"
>;

export function UserPasswordTextField({
  name,
  label,
  placeholder,
}: UserPasswordTextFieldProps) {
  const t = useTranslations("dashboard.users.UserPasswordTextField");

  return (
    <TextField
      data-test="user-password-field"
      name={name}
      type="password"
      label={label}
      placeholder={placeholder}
      isRequired
      minLength={8}
      maxLength={128}
      autoComplete="off"
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
