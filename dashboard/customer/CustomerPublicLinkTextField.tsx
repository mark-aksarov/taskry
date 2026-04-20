import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface CustomerPublicLinkTextFieldProps {
  defaultValue?: string;
}

export function CustomerPublicLinkTextField({
  defaultValue,
}: CustomerPublicLinkTextFieldProps) {
  const t = useTranslations("dashboard.customers.CustomerPublicLinkTextField");

  return (
    <TextField
      data-test="customer-public-link-field"
      name="publicLink"
      type="url"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.format")}
      defaultValue={defaultValue}
    />
  );
}
