import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

interface ProjectFormBaseTitleTextFieldProps {
  defaultValue?: string;
}

export function ProjectFormBaseTitleTextField({
  defaultValue,
}: ProjectFormBaseTitleTextFieldProps) {
  const t = useTranslations("projects.ProjectFormBase.title");

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
