import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateTaskDeadline } from "../UpdateTaskDeadlineContext";

export function UpdateTaskDeadlineFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskDeadlineForm");

  const { isPending } = useUpdateTaskDeadline();

  return (
    <FormBaseSubmitButton
      form="update-task-deadline-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
