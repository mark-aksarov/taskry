"use client";

import { useTranslations } from "next-intl";
import { useCreateProjectTriggerPress } from "./useCreateProjectTriggerPress";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateProjectTriggerDisabled } from "./useCreateProjectTriggerDisabled";

export function CreateProjectModalTriggerMobile({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("dashboard.projects.CreateProjectModalTrigger");

  const isDisabled = useCreateProjectTriggerDisabled();
  const handlePress = useCreateProjectTriggerPress();

  return (
    <CreateNewButtonMobile
      aria-label={t("label")}
      data-test="create-project-modal-trigger-mobile"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
