import { TextField } from "@/components/ui";
import { useTranslations } from "next-intl";

export function NewProjectFormDescriptionTextField() {
  const t = useTranslations(
    "projects.NewProjectForm.NewProjectFormDescriptionTextField",
  );

  return (
    <TextField
      multiline
      name="description"
      label={t("label")}
      placeholder={t("placeholder")}
      inputClassName="h-[9rem]"
      maxLength={5000}
    />
  );
}
