import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserFormBasePublicLinkTextFieldProps {
  defaultValue?: string;
}

export function UserFormBasePublicLinkTextField({
  defaultValue,
}: UserFormBasePublicLinkTextFieldProps) {
  const t = useTranslations("users.UserFormBasePublicLinkTextField");

  return (
    <TextField
      name="publicLink"
      type="url"
      maxLength={255}
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={t("validation.format")}
      defaultValue={defaultValue}
    />
  );
}
