"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";
import { useUpdateTaskDescription } from "../UpdateTaskDescriptionContext";

export interface UpdateTaskDescriptionFormProps {
  taskId: number;
  description?: string;
}

export function UpdateTaskDescriptionForm({
  taskId,
  description,
}: UpdateTaskDescriptionFormProps) {
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
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskDescriptionTextField defaultValue={description} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
