import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface UserPublicLinkTextFieldProps {
  defaultValue?: string;
}

export function UserPublicLinkTextField({
  defaultValue,
}: UserPublicLinkTextFieldProps) {
  const t = useTranslations("dashboard.users.UserPublicLinkTextField");

  return (
    <TextField
      data-test="user-public-link-field"
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
