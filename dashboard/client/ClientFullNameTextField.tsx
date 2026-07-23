import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface ClientFullNameTextFieldProps {
  defaultValue?: string;
}

export function ClientFullNameTextField({
  defaultValue,
}: ClientFullNameTextFieldProps) {
  const t = useTranslations("dashboard.clients.ClientFullNameTextField");

  return (
    <TextField
      data-test="client-full-name-field"
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
