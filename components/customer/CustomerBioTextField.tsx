import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface CustomerBioTextFieldProps {
  defaultValue?: string;
}

export function CustomerBioTextField({
  defaultValue,
}: CustomerBioTextFieldProps) {
  const t = useTranslations("customers.CustomerBioTextField");

  return (
    <TextField
      multiline
      data-test="customer-bio-field"
      name="bio"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
