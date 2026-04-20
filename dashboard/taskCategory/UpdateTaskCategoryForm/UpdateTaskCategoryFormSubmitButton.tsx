"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";

export function UpdateTaskCategoryFormSubmitButton() {
  const t = useTranslations("dashboard.taskCategories.UpdateTaskCategoryForm");

  const { isPending } = useUpdateTaskCategory();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-task-category-form"
      label={t("submitButtonLabel")}
    />
  );
}
