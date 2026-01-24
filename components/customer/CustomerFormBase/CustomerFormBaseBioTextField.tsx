import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

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
