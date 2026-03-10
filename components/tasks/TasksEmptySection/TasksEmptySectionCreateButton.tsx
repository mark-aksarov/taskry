"use client";

import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function TasksEmptySectionCreateButton() {
  const t = useTranslations("tasks.TasksEmptySection");

  const { onModalOpenChange } = useCreateTask();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("button")}
    </EmptySectionButton>
  );
}
