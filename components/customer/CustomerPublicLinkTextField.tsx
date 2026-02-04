import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerPublicLinkTextFieldProps {
  defaultValue?: string;
}

export function CustomerPublicLinkTextField({
  defaultValue,
}: CustomerPublicLinkTextFieldProps) {
  const t = useTranslations("customers.CustomerPublicLinkTextField");

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
