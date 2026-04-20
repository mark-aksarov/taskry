import { useTranslations } from "next-intl";
import { useUpdateTaskTitle } from "../UpdateTaskTitleContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateTaskTitleFormSubmitButton() {
  const t = useTranslations("dashboard.tasks.UpdateTaskTitleForm");

  const { isPending } = useUpdateTaskTitle();

  return (
    <FormBaseSubmitButton
      form="update-task-title-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
