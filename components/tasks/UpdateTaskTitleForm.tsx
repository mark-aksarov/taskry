"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { TaskTitleTextField } from "./TaskTitleTextField";
import { useUpdateTaskTitle } from "./UpdateTaskTitleContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateTaskTitleFormProps {
  taskId: number;
  title?: string;
}

export function UpdateTaskTitleForm({
  taskId,
  title,
}: UpdateTaskTitleFormProps) {
  const t = useTranslations("tasks.UpdateTaskTitleForm");

  const { state, action, isPending } = useUpdateTaskTitle();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-title-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {taskId && <input type="hidden" name="id" value={taskId} />}
        <TaskTitleTextField defaultValue={title} />

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
