"use client";

import { useTranslations } from "next-intl";
import { useUpdateUserBio } from "../UpdateUserBioContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateUserBioFormSubmitButton() {
  const t = useTranslations("dashboard.users.UpdateUserBioForm");

  const { isPending } = useUpdateUserBio();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-bio-form"
      label={t("submitButtonLabel")}
    />
  );
}
