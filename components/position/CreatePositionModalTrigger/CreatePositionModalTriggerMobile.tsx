"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonMobile } from "@/components/common/CreateNewButton";
import { useCreatePositionTriggerPress } from "./useCreatePositionTriggerPress";
import { useCreatePositionTriggerDisabled } from "./useCreatePositionTriggerDisabled";

export function CreatePositionModalTriggerMobile() {
  const t = useTranslations("positions.CreatePositionModalTrigger");

  const isDisabled = useCreatePositionTriggerDisabled();
  const handlePress = useCreatePositionTriggerPress();

  return (
    <CreateNewButtonMobile
      data-test="create-position-modal-trigger-mobile"
      aria-label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
