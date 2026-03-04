"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { SubtaskTextField } from "../SubtaskTextField";
import { useUpdateSubtask } from "../UpdateSubtaskContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface EditSubtaskFormProps {
  subtaskId: number;
  taskId: number;
  textDefaultValue?: string;
}

export function EditSubtaskForm({
  subtaskId,
  taskId,
  textDefaultValue,
}: EditSubtaskFormProps) {
  const t = useTranslations("subtasks.EditSubtaskForm");

  const { state, isPending, action } = useUpdateSubtask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-subtask-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={subtaskId} />
        <input type="hidden" name="taskId" value={taskId} />
        <SubtaskTextField defaultValue={textDefaultValue} />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>

      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
