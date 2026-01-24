import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProjectFormBaseDescriptionTextFieldProps {
  defaultValue?: string;
}

export function ProjectFormBaseDescriptionTextField({
  defaultValue,
}: ProjectFormBaseDescriptionTextFieldProps) {
  const t = useTranslations("projects.ProjectFormBaseDescriptionTextField");

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
