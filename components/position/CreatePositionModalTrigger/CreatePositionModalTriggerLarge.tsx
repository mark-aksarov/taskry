"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreatePositionTriggerPress } from "./useCreatePositionTriggerPress";
import { useCreatePositionTriggerDisabled } from "./useCreatePositionTriggerDisabled";

export function CreatePositionModalTriggerLarge() {
  const t = useTranslations("positions.CreatePositionModalTrigger");

  const isDisabled = useCreatePositionTriggerDisabled();
  const handlePress = useCreatePositionTriggerPress();

  return (
    <CreateNewButtonLarge
      data-test="create-position-modal-trigger-large"
      label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
