"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function TaskCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "taskCategories.TaskCategoriesEmptySectionCreateButton",
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
