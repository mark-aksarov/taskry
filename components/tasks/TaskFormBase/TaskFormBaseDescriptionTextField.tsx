import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface TaskFormBaseDescriptionTextFieldProps {
  defaultValue?: string;
}

export function TaskFormBaseDescriptionTextField({
  defaultValue,
}: TaskFormBaseDescriptionTextFieldProps) {
  const t = useTranslations("tasks.TaskFormBase.description");

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
