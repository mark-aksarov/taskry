import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface ClientBioTextFieldProps {
  defaultValue?: string;
}

export function ClientBioTextField({
  defaultValue,
}: ClientBioTextFieldProps) {
  const t = useTranslations("dashboard.clients.ClientBioTextField");

  return (
    <TextField
      multiline
      data-test="client-bio-field"
      name="bio"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
