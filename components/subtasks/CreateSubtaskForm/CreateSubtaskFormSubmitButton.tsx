"use client";

import { useTranslations } from "next-intl";
import { useCreateSubtask } from "../CreateSubtaskContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function CreateSubtaskFormSubmitButton() {
  const t = useTranslations("subtasks.CreateSubtaskForm");

  const { isPending } = useCreateSubtask();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-subtask-form"
      label={t("submitButtonLabel")}
    />
  );
}
