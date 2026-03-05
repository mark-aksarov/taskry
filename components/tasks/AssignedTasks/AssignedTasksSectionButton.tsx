"use client";

import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function AssignedTasksSectionButton() {
  const t = useTranslations("tasks.AssignedTasksEmptyCard");

  const { onModalOpenChange } = useCreateTask();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("button")}
    </EmptySectionButton>
  );
}
