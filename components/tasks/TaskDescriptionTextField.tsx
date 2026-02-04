import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface TaskDescriptionTextFieldProps {
  defaultValue?: string;
}

export function TaskDescriptionTextField({
  defaultValue,
}: TaskDescriptionTextFieldProps) {
  const t = useTranslations("tasks.TaskDescriptionTextField");

  return (
    <TextField
      multiline
      name="description"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
