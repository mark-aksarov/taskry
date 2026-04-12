import { useTranslations } from "next-intl";
import { useUpdateTaskTitle } from "../UpdateTaskTitleContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateTaskTitleFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskTitleForm");

  const { isPending } = useUpdateTaskTitle();

  return (
    <FormBaseSubmitButton
      form="update-task-title-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
