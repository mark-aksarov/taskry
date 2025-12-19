import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

export function NewProjectFormTitleTextField() {
  const t = useTranslations(
    "projects.NewProjectForm.NewProjectFormTitleTextField",
  );

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
      isRequired
    />
  );
}
