"use client";

import { useTranslations } from "next-intl";
import { EmptySectionButton } from "@/components/common/EmptySection";
import { useCreateTaskCategory } from "./CreateTaskCategoryContext";

export function TaskCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "taskCategories.TaskCategoriesEmptySectionCreateButton",
  );

  const { onModalOpenChange } = useCreateTaskCategory();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
