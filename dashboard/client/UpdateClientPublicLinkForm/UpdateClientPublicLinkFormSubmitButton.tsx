"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateClientPublicLink } from "../UpdateClientPublicLinkContext";

export function UpdateClientPublicLinkFormSubmitButton() {
  const t = useTranslations("dashboard.clients.UpdateClientPublicLinkForm");

  const { isPending } = useUpdateClientPublicLink();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-client-public-link-form"
      label={t("submitButtonLabel")}
    />
  );
}
