"use client";

import { useTranslations } from "next-intl";
import { useCreateUserTriggerPress } from "./useCreateUserTriggerPress";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateUserTriggerDisabled } from "./useCreateUserTriggerDisabled";

export function CreateUserModalTriggerMobile({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("dashboard.users.CreateUserModalTrigger");

  const isDisabled = useCreateUserTriggerDisabled();
  const handlePress = useCreateUserTriggerPress();

  return (
    <CreateNewButtonMobile
      aria-label={t("label")}
      data-test="create-user-modal-trigger-mobile"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
