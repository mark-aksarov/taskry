"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function TasksEmptySectionCreateButton() {
  const t = useTranslations("tasks.TasksEmptySection");

  const { onOpenChange: onModalOpenChange } = useModal("createTask");

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("button")}
    </EmptySectionButton>
  );
}
