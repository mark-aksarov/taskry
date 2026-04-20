import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateTaskCategoryRel } from "../UpdateTaskCategoryRelContext";

export function UpdateTaskCategoryRelFormSubmitButton() {
  const t = useTranslations("dashboard.tasks.UpdateTaskCategoryRelForm");

  const { isPending } = useUpdateTaskCategoryRel();

  return (
    <FormBaseSubmitButton
      form="update-task-category-rel-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
