"use client";

import { useTranslations } from "next-intl";
import { useUpdateSubtask } from "../UpdateSubtaskContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateSubtaskFormSubmitButton() {
  const t = useTranslations("subtasks.UpdateSubtaskForm");

  const { isPending } = useUpdateSubtask();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-subtask-form"
      label={t("submitButtonLabel")}
    />
  );
}
