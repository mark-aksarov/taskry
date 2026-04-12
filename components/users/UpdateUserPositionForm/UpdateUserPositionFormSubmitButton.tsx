"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateUserPosition } from "../UpdateUserPositionContext";

export function UpdateUserPositionFormSubmitButton() {
  const t = useTranslations("users.UpdateUserPositionForm");

  const { isPending } = useUpdateUserPosition();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-user-position-form"
      label={t("submitButtonLabel")}
    />
  );
}
