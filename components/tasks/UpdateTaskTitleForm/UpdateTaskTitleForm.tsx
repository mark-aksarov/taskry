"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { useUpdateTaskTitle } from "../UpdateTaskTitleContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateTaskTitleFormProps {
  taskId: number;
  title: string;
}

export function UpdateTaskTitleForm({
  taskId,
  title,
}: UpdateTaskTitleFormProps) {
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
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskTitleTextField defaultValue={title} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
