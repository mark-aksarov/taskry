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
import { useCreateSubtask } from "../CreateSubtaskContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface NewSubtaskFormProps {
  taskId: number;
}

export function NewSubtaskForm({ taskId }: NewSubtaskFormProps) {
  const t = useTranslations("subtasks.NewSubtaskForm");

  const { state, action, isPending } = useCreateSubtask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-subtask-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="taskId" value={taskId} />
        <SubtaskTextField />
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
