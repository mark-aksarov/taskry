import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateTaskDescription } from "../UpdateTaskDescriptionContext";

export function UpdateTaskDescriptionFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskDescriptionForm");

  const { isPending } = useUpdateTaskDescription();

  return (
    <FormBaseSubmitButton
      form="update-task-description-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
