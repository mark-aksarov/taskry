"use client";

import { useTranslations } from "next-intl";
import { useUpdatePosition } from "../UpdatePositionContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdatePositionFormSubmitButton() {
  const t = useTranslations("positions.UpdatePositionForm");

  const { isPending } = useUpdatePosition();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-position-form"
      label={t("submitButtonLabel")}
    />
  );
}
