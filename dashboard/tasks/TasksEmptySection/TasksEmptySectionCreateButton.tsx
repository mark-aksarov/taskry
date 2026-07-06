"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function TasksEmptySectionCreateButton() {
  const t = useTranslations("dashboard.tasks.TasksEmptySectionBase");

  const { onOpenChange: onModalOpenChange } = useModal("createTask");

  return (
    <FallbackSectionButton
      data-test="tasks-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("button")}
    </FallbackSectionButton>
  );
}
