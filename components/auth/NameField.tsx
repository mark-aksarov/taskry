"use client";

import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

export function NameField() {
  const t = useTranslations("auth.NameField");

  return (
    <TextField
      label={t("label")}
      name="name"
      placeholder={t("placeholder")}
      isRequired
      minLength={5}
      maxLength={50}
      errorMessage={(validation) => {
        const details = validation.validationDetails;

        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooShort) {
          return t("validation.tooShort", { minLength: 5 });
        }
        if (details.tooLong) {
          return t("validation.tooLong", { maxLength: 50 });
        }

        return "";
      }}
    />
  );
}
