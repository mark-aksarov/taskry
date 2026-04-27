"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { EmptySectionButton } from "@/dashboard/common/EmptySection";

export function TasksEmptySectionCreateButton() {
  const t = useTranslations("dashboard.tasks.TasksEmptySection");

  const { onOpenChange: onModalOpenChange } = useModal("createTask");

  return (
    <EmptySectionButton
      data-test="tasks-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("button")}
    </EmptySectionButton>
  );
}
