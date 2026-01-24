import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerFormBasePublicLinkTextFieldProps {
  defaultValue?: string;
}

export function CustomerFormBasePublicLinkTextField({
  defaultValue,
}: CustomerFormBasePublicLinkTextFieldProps) {
  const t = useTranslations("customers.CustomerFormBasePublicLinkTextField");

  return (
    <TextField
      name="publicLink"
      type="url"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.format")}
      defaultValue={defaultValue}
    />
  );
}
