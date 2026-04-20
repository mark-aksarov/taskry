"use client";

import { useTranslations } from "next-intl";
import { useCreateSubtask } from "../CreateSubtaskContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function CreateSubtaskFormSubmitButton() {
  const t = useTranslations("dashboard.subtasks.CreateSubtaskForm");

  const { isPending } = useCreateSubtask();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-subtask-form"
      label={t("submitButtonLabel")}
    />
  );
}
