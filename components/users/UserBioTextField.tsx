import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserBioTextFieldProps {
  defaultValue?: string;
}

export function UserBioTextField({ defaultValue }: UserBioTextFieldProps) {
  const t = useTranslations("users.UserBioTextField");

  return (
    <TextField
      multiline
      data-test="user-bio-field"
      name="bio"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
