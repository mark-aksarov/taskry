"use client";

import { useTranslations } from "next-intl";
import { useCreateClientTriggerPress } from "./useCreateClientTriggerPress";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateClientTriggerDisabled } from "./useCreateClientTriggerDisabled";

export function CreateClientModalTriggerMobile({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("dashboard.clients.CreateClientModalTrigger");

  const isDisabled = useCreateClientTriggerDisabled();
  const handlePress = useCreateClientTriggerPress();

  return (
    <CreateNewButtonMobile
      aria-label={t("label")}
      data-test="create-client-modal-trigger-mobile"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
