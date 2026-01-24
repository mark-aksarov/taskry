import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface CustomerFormBaseEmailTextFieldProps {
  defaultValue?: string;
}

export function CustomerFormBaseEmailTextField({
  defaultValue,
}: CustomerFormBaseEmailTextFieldProps) {
  const t = useTranslations("customers.CustomerFormBaseEmailTextField");

  return (
    <TextField
      name="email"
      label={t("label")}
      placeholder={t("placeholder")}
      type="email"
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
