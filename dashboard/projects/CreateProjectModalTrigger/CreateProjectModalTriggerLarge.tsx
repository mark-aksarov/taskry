"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateProjectTriggerPress } from "./useCreateProjectTriggerPress";
import { useCreateProjectTriggerDisabled } from "./useCreateProjectTriggerDisabled";

export function CreateProjectModalTriggerLarge({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("dashboard.projects.CreateProjectModalTrigger");

  const isDisabled = useCreateProjectTriggerDisabled();
  const handlePress = useCreateProjectTriggerPress();

  return (
    <CreateNewButtonLarge
      label={t("label")}
      data-test="create-project-modal-trigger-large"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
