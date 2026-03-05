"use client";

import { useTranslations } from "next-intl";
import { EmptySectionButton } from "@/components/common/EmptySection";
import { useCreateTask } from "@/components/tasks/CreateTaskContext";

export function UserTasksEmptySectionButton() {
  const t = useTranslations("users.UserTasksEmptySection");

  const { onModalOpenChange } = useCreateTask();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("editButtonLabel")}
    </EmptySectionButton>
  );
}
