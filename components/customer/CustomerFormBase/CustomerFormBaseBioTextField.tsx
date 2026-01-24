import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface CustomerFormBaseBioTextFieldProps {
  defaultValue?: string;
}

export function CustomerFormBaseBioTextField({
  defaultValue,
}: CustomerFormBaseBioTextFieldProps) {
  const t = useTranslations("customers.CustomerFormBaseBioTextField");

  return (
    <TextField
      multiline
      name="bio"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
