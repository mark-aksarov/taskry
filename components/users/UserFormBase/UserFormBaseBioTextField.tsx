import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface UserFormBaseBioTextFieldProps {
  defaultValue?: string;
}

export function UserFormBaseBioTextField({
  defaultValue,
}: UserFormBaseBioTextFieldProps) {
  const t = useTranslations("users.UserFormBaseBioTextField");

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
