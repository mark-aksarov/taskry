"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateUserPosition } from "../UpdateUserPositionContext";

export function UpdateUserPositionFormSubmitButton() {
  const t = useTranslations("dashboard.users.UpdateUserPositionForm");

  const { isPending } = useUpdateUserPosition();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-position-form"
      label={t("submitButtonLabel")}
    />
  );
}
