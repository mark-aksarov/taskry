"use client";

import { useTranslations } from "next-intl";
import { CreateUserMenuTrigger } from "./CreateUserMenuTrigger";
import { CreateNewButtonMobile } from "@/components/common/CreateNewButton";
import { useCreateUserButtonDisabled } from "./useCreateUserButtonDisabled";

export function CreateUserMenuTriggerMobile() {
  const t = useTranslations("users.CreateUserMenuTrigger");

  const isDisabled = useCreateUserButtonDisabled();

  return (
    <CreateUserMenuTrigger
      renderButton={() => (
        <CreateNewButtonMobile
          data-test="create-user-menu-trigger-mobile"
          aria-label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
