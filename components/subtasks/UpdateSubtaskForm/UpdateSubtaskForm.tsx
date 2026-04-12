"use client";

import { startTransition } from "react";
import { SubtaskTextField } from "../SubtaskTextField";
import { FormBase } from "@/components/common/FormBase";
import { useUpdateSubtask } from "../UpdateSubtaskContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface UpdateSubtaskFormProps {
  subtaskId: number;
  taskId: number;
  textDefaultValue?: string;
}

export function UpdateSubtaskForm({
  subtaskId,
  taskId,
  textDefaultValue,
}: UpdateSubtaskFormProps) {
  const { state, isPending, action } = useUpdateSubtask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-subtask-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={subtaskId} />
      <input type="hidden" name="taskId" value={taskId} />
      <SubtaskTextField defaultValue={textDefaultValue} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
