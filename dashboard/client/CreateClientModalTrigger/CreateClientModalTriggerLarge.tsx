"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateClientTriggerPress } from "./useCreateClientTriggerPress";
import { useCreateClientTriggerDisabled } from "./useCreateClientTriggerDisabled";

export function CreateClientModalTriggerLarge({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("dashboard.clients.CreateClientModalTrigger");

  const isDisabled = useCreateClientTriggerDisabled();
  const handlePress = useCreateClientTriggerPress();

  return (
    <CreateNewButtonLarge
      label={t("label")}
      data-test="create-client-modal-trigger-large"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
