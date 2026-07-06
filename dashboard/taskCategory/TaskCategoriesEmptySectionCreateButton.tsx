"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function TaskCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.taskCategories.TaskCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal("createTaskCategory");

  return (
    <FallbackSectionButton
      data-test="task-categories-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
