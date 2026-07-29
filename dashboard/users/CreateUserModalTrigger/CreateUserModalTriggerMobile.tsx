"use client";

import { useTranslations } from "next-intl";
import { useRole } from "@/common/RoleContext";
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
  const role = useRole();

  if (role !== "owner") {
    return null;
  }

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
