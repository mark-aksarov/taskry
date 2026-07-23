"use client";

import { useTranslations } from "next-intl";
import { useUpdateClientBio } from "../UpdateClientBioContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateClientBioFormSubmitButton() {
  const t = useTranslations("dashboard.clients.UpdateClientBioForm");

  const { isPending } = useUpdateClientBio();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-bio-form"
      label={t("submitButtonLabel")}
    />
  );
}
