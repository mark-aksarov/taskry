"use client";

import { useTranslations } from "next-intl";
import { useCreatePosition } from "../CreatePositionContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function CreatePositionFormSubmitButton() {
  const t = useTranslations("positions.CreatePositionForm");

  const { isPending } = useCreatePosition();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-position-form"
      label={t("submitButtonLabel")}
    />
  );
}
