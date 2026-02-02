import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserFormBaseAddressTextFieldProps {
  defaultValue?: string;
}

export function UserFormBaseAddressTextField({
  defaultValue,
}: UserFormBaseAddressTextFieldProps) {
  const t = useTranslations("users.UserFormBaseAddressTextField");

  return (
    <TextField
      name="address"
      maxLength={255}
      label={t("label")}
      placeholder={t("placeholder")}
      defaultValue={defaultValue}
    />
  );
}
