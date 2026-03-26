"use client";

import { useTranslations } from "next-intl";
import { EmptySectionButton } from "@/components/common/EmptySection";
import { useCreateTaskCategoryModal } from "./CreateTaskCategoryModal";

export function TaskCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "taskCategories.TaskCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useCreateTaskCategoryModal();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
