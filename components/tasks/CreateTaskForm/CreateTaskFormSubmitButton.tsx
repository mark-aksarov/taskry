import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function CreateTaskFormSubmitButton() {
  const t = useTranslations("tasks.CreateTaskForm");

  const { isPending } = useCreateTask();

  return (
    <FormBaseSubmitButton
      form="create-task-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
