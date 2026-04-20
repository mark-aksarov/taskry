import { useTranslations } from "next-intl";
import { useUpdateTask } from "../UpdateTaskContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateTaskFormSubmitButton() {
  const t = useTranslations("dashboard.tasks.UpdateTaskForm");

  const { isPending } = useUpdateTask();

  return (
    <FormBaseSubmitButton
      form="update-task-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
