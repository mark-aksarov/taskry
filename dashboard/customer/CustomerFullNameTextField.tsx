import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface CustomerFullNameTextFieldProps {
  defaultValue?: string;
}

export function CustomerFullNameTextField({
  defaultValue,
}: CustomerFullNameTextFieldProps) {
  const t = useTranslations("dashboard.customers.CustomerFullNameTextField");

  return (
    <TextField
      data-test="customer-full-name-field"
      name="fullName"
      label={t("label")}
      placeholder={t("placeholder")}
      maxLength={255}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
