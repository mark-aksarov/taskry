import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface ClientPublicLinkTextFieldProps {
  defaultValue?: string;
}

export function ClientPublicLinkTextField({
  defaultValue,
}: ClientPublicLinkTextFieldProps) {
  const t = useTranslations("dashboard.clients.ClientPublicLinkTextField");

  return (
    <TextField
      data-test="client-public-link-field"
      name="publicLink"
      type="url"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.format")}
      defaultValue={defaultValue}
    />
  );
}
