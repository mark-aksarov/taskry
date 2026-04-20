"use client";

import { useTranslations } from "next-intl";
import { useCreateTaskTriggerPress } from "./useCreateTaskTriggerPress";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateTaskTriggerDisabled } from "./useCreateTaskTriggerDisabled";

export function CreateTaskModalTriggerMobile({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("dashboard.tasks.CreateTaskModalTrigger");

  const isDisabled = useCreateTaskTriggerDisabled();
  const handlePress = useCreateTaskTriggerPress();

  return (
    <CreateNewButtonMobile
      aria-label={t("label")}
      data-test="create-task-modal-trigger-mobile"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
