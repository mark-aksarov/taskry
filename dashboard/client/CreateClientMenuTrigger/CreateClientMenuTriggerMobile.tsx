"use client";

import { useTranslations } from "next-intl";
import { CreateClientMenuTrigger } from "./CreateClientMenuTrigger";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateClientButtonDisabled } from "./useCreateClientButtonDisabled";

export function CreateClientMenuTriggerMobile() {
  const t = useTranslations("dashboard.clients.CreateClientMenuTrigger");

  const isDisabled = useCreateClientButtonDisabled();

  return (
    <CreateClientMenuTrigger
      renderButton={() => (
        <CreateNewButtonMobile
          data-test="create-client-menu-trigger-mobile"
          aria-label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
