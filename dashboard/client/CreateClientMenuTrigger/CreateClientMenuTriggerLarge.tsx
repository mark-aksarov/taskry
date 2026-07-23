"use client";

import { useTranslations } from "next-intl";
import { CreateClientMenuTrigger } from "./CreateClientMenuTrigger";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateClientButtonDisabled } from "./useCreateClientButtonDisabled";

export function CreateClientMenuTriggerLarge() {
  const t = useTranslations("dashboard.clients.CreateClientMenuTrigger");

  const isDisabled = useCreateClientButtonDisabled();

  return (
    <CreateClientMenuTrigger
      renderButton={() => (
        <CreateNewButtonLarge
          data-test="create-client-menu-trigger-large"
          label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
