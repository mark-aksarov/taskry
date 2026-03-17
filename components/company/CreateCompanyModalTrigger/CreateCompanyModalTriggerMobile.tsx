"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonMobile } from "@/components/common/CreateNewButton";
import { useCreateCompanyTriggerPress } from "./useCreateCompanyTriggerPress";
import { useCreateCompanyTriggerDisabled } from "./useCreateCompanyTriggerDisabled";

export function CreateCompanyModalTriggerMobile() {
  const t = useTranslations("company.CreateCompanyModalTrigger");

  const isDisabled = useCreateCompanyTriggerDisabled();
  const handlePress = useCreateCompanyTriggerPress();

  return (
    <CreateNewButtonMobile
      data-test="create-company-modal-trigger-mobile"
      aria-label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
