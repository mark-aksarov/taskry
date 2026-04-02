"use client";

import { useTranslations } from "next-intl";
import { useCreateTaskTriggerPress } from "./useCreateTaskTriggerPress";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateTaskTriggerDisabled } from "./useCreateTaskTriggerDisabled";

export function CreateTaskModalTriggerLarge({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("tasks.CreateTaskModalTrigger");

  const isDisabled = useCreateTaskTriggerDisabled();
  const handlePress = useCreateTaskTriggerPress();

  return (
    <CreateNewButtonLarge
      label={t("label")}
      data-test="create-task-modal-trigger-large"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
