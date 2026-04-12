"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";

export function CreateTaskCategoryFormSubmitButton() {
  const t = useTranslations("taskCategories.CreateTaskCategoryForm");

  const { isPending } = useCreateTaskCategory();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-task-category-form"
      label={t("submitButtonLabel")}
    />
  );
}
