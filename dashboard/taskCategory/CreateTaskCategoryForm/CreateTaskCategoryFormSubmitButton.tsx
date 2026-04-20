"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";

export function CreateTaskCategoryFormSubmitButton() {
  const t = useTranslations("dashboard.taskCategories.CreateTaskCategoryForm");

  const { isPending } = useCreateTaskCategory();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-task-category-form"
      label={t("submitButtonLabel")}
    />
  );
}
