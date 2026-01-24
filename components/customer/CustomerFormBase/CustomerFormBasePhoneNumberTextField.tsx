import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface CustomerFormBasePhoneNumberTextFieldProps {
  defaultValue?: string;
}

export function CustomerFormBasePhoneNumberTextField({
  defaultValue,
}: CustomerFormBasePhoneNumberTextFieldProps) {
  const t = useTranslations("customers.CustomerFormBasePhoneNumberTextField");

  return (
    <TextField
      name="phoneNumber"
      label={t("label")}
      placeholder={t("placeholder")}
      type="tel"
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
    />
  );
}
