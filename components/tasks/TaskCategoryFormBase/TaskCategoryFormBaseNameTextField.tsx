import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface TaskCategoryFormBaseNameTextFieldProps {
  defaultValue?: string;
}

export function TaskCategoryFormBaseNameTextField({
  defaultValue,
}: TaskCategoryFormBaseNameTextFieldProps) {
  const t = useTranslations("tasks.TaskCategoryFormBaseNameTextField");

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
