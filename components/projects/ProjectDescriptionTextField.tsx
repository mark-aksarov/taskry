import { useTranslations } from "next-intl";
import { TextField } from "@/components/ui/TextField";

interface ProjectDescriptionTextFieldProps {
  defaultValue?: string;
}

export function ProjectDescriptionTextField({
  defaultValue,
}: ProjectDescriptionTextFieldProps) {
  const t = useTranslations("projects.ProjectDescriptionTextField");

  return (
    <TextField
      multiline
      data-test="project-description-field"
      name="description"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
      defaultValue={defaultValue}
    />
  );
}
