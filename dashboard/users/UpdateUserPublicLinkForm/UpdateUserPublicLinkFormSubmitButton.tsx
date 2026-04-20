"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateUserPublicLink } from "../UpdateUserPublicLinkContext";

export function UpdateUserPublicLinkFormSubmitButton() {
  const t = useTranslations("dashboard.users.UpdateUserPublicLinkForm");

  const { isPending } = useUpdateUserPublicLink();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-public-link-form"
      label={t("submitButtonLabel")}
    />
  );
}
