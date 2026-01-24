import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface TaskFormBaseTitleTextFieldProps {
  defaultValue?: string;
}

export function TaskFormBaseTitleTextField({
  defaultValue,
}: TaskFormBaseTitleTextFieldProps) {
  const t = useTranslations("tasks.TaskFormBaseTitleTextField");

  return (
    <TextField
      name="title"
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
