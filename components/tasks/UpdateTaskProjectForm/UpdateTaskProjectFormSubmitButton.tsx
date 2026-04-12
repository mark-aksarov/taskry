import { useTranslations } from "next-intl";
import { useUpdateTaskProject } from "../UpdateTaskProjectContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateTaskProjectFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskProjectForm");

  const { isPending } = useUpdateTaskProject();

  return (
    <FormBaseSubmitButton
      form="update-task-project-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
