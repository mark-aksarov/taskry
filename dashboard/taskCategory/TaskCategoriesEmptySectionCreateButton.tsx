"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { EmptySectionButton } from "@/dashboard/common/EmptySection";

export function TaskCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.taskCategories.TaskCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal("createTaskCategory");

  return (
    <EmptySectionButton
      data-test="task-categories-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </EmptySectionButton>
  );
}
