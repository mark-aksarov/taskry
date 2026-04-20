import { useTranslations } from "next-intl";
import { useUpdateTaskProject } from "../UpdateTaskProjectContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateTaskProjectFormSubmitButton() {
  const t = useTranslations("dashboard.tasks.UpdateTaskProjectForm");

  const { isPending } = useUpdateTaskProject();

  return (
    <FormBaseSubmitButton
      form="update-task-project-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
