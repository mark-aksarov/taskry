import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateTaskStatusAlt } from "../UpdateTaskStatusAltContext";

export function UpdateTaskStatusFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskStatusForm");

  const { isPending } = useUpdateTaskStatusAlt();

  return (
    <FormBaseSubmitButton
      form="update-task-status-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
