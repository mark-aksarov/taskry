import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface PositionFormBaseNameTextFieldProps {
  defaultValue?: string;
}

export function PositionFormBaseNameTextField({
  defaultValue,
}: PositionFormBaseNameTextFieldProps) {
  const t = useTranslations("users.PositionFormBase.title");

  return (
    <TextField
      name="name"
      label={t("label")}
      placeholder={t("placeholder")}
      errorMessage={(validation) => {
        const details = validation.validationDetails;
        if (details.valueMissing) {
          return t("validation.required");
        }
        if (details.tooLong) {
          return t("validation.tooLong", { maxLength: 255 });
        }
        return "";
      }}
      defaultValue={defaultValue}
      isRequired
    />
  );
}
