import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserAddressTextFieldProps {
  defaultValue?: string;
}

export function UserAddressTextField({
  defaultValue,
}: UserAddressTextFieldProps) {
  const t = useTranslations("users.UserAddressTextField");

  return (
    <TextField
      data-test="user-address-field"
      name="address"
      maxLength={255}
      label={t("label")}
      placeholder={t("placeholder")}
      defaultValue={defaultValue}
    />
  );
}
