"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateCompanyTriggerPress } from "./useCreateCompanyTriggerPress";
import { useCreateCompanyTriggerDisabled } from "./useCreateCompanyTriggerDisabled";

export function CreateCompanyModalTriggerLarge() {
  const t = useTranslations("dashboard.company.CreateCompanyModalTrigger");

  const isDisabled = useCreateCompanyTriggerDisabled();
  const handlePress = useCreateCompanyTriggerPress();

  return (
    <CreateNewButtonLarge
      data-test="create-company-modal-trigger-large"
      label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
