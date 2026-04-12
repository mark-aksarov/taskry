"use client";

import { startTransition } from "react";
import { SubtaskTextField } from "../SubtaskTextField";
import { FormBase } from "@/components/common/FormBase";
import { useCreateSubtask } from "../CreateSubtaskContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface CreateSubtaskFormProps {
  taskId: number;
}

export function CreateSubtaskForm({ taskId }: CreateSubtaskFormProps) {
  const { state, action, isPending } = useCreateSubtask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-subtask-form" onSubmit={handleSubmit}>
      <input type="hidden" name="taskId" value={taskId} />
      <SubtaskTextField />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
