"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { TaskDescriptionTextField } from "./TaskDescriptionTextField";
import { useUpdateTaskDescription } from "./UpdateTaskDescriptionContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateTaskDescriptionFormProps {
  taskId: number;
  description?: string;
}

export function UpdateTaskDescriptionForm({
  taskId,
  description,
}: UpdateTaskDescriptionFormProps) {
  const t = useTranslations("tasks.UpdateTaskDescriptionForm");

  const { state, action, isPending } = useUpdateTaskDescription();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-description-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {taskId && <input type="hidden" name="id" value={taskId} />}
        <TaskDescriptionTextField defaultValue={description} />

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
