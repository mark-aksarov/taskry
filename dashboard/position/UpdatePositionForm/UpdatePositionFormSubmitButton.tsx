"use client";

import { useTranslations } from "next-intl";
import { useUpdatePosition } from "../UpdatePositionContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdatePositionFormSubmitButton() {
  const t = useTranslations("dashboard.positions.UpdatePositionForm");

  const { isPending } = useUpdatePosition();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-position-form"
      label={t("submitButtonLabel")}
    />
  );
}
