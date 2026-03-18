"use client";

import { useTranslations } from "next-intl";
import { CreateUserMenuTrigger } from "./CreateUserMenuTrigger";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateUserButtonDisabled } from "./useCreateUserButtonDisabled";

export function CreateUserMenuTriggerLarge() {
  const t = useTranslations("users.CreateUserMenuTrigger");

  const isDisabled = useCreateUserButtonDisabled();

  return (
    <CreateUserMenuTrigger
      renderButton={() => (
        <CreateNewButtonLarge
          data-test="create-user-menu-trigger-large"
          label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
