import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateTaskCategoryForTask } from "../UpdateTaskCategoryForTaskContext";

export function UpdateTaskCategoryForTaskFormSubmitButton() {
  const t = useTranslations("tasks.UpdateTaskCategoryForTaskForm");

  const { isPending } = useUpdateTaskCategoryForTask();

  return (
    <FormBaseSubmitButton
      form="update-task-category-for-task-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
