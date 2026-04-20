"use client";

import { useTranslations } from "next-intl";
import { useCreatePosition } from "../CreatePositionContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function CreatePositionFormSubmitButton() {
  const t = useTranslations("dashboard.positions.CreatePositionForm");

  const { isPending } = useCreatePosition();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-position-form"
      label={t("submitButtonLabel")}
    />
  );
}
