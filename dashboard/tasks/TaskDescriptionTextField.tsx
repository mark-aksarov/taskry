import { useTranslations } from "next-intl";
import { TextField } from "@/ui/TextField";

interface TaskDescriptionTextFieldProps {
  defaultValue?: string;
}

export function TaskDescriptionTextField({
  defaultValue,
}: TaskDescriptionTextFieldProps) {
  const t = useTranslations("dashboard.tasks.TaskDescriptionTextField");

  return (
    <TextField
      multiline
      data-test="task-description-field"
      name="description"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
