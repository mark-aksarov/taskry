import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface CustomerFormBasePublicLinkTextFieldProps {
  defaultValue?: string;
}

export function CustomerFormBasePublicLinkTextField({
  defaultValue,
}: CustomerFormBasePublicLinkTextFieldProps) {
  const t = useTranslations("customers.CustomerFormBase.publicLink");

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
