import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateTaskAssignee } from "../UpdateTaskAssigneeContext";

export function UpdateTaskAssigneeFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskAssigneeForm");

  const { isPending } = useUpdateTaskAssignee();

  return (
    <FormBaseSubmitButton
      form="update-task-assignee-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
