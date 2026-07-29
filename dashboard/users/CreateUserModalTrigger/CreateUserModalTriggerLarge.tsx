"use client";

import { useTranslations } from "next-intl";
import { useRole } from "@/common/RoleContext";
import { useCreateUserTriggerPress } from "./useCreateUserTriggerPress";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateUserTriggerDisabled } from "./useCreateUserTriggerDisabled";

export function CreateUserModalTriggerLarge({
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
    <CreateNewButtonLarge
      label={t("label")}
      data-test="create-user-modal-trigger-large"
      onPress={handlePress}
      isDisabled={isDisabled}
      className={className}
    />
  );
}
