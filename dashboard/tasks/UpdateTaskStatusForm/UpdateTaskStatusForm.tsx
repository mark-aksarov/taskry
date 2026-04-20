"use client";

import { startTransition } from "react";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useUpdateTaskStatusAlt } from "../UpdateTaskStatusAltContext";

export interface UpdateTaskStatusFormProps {
  taskId: number;
  status: TaskStatus;
}

export function UpdateTaskStatusForm({
  taskId,
  status,
}: UpdateTaskStatusFormProps) {
  const { state, action, isPending } = useUpdateTaskStatusAlt();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-status-form" onSubmit={handleSubmit}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskStatusSelect defaultSelectedKey={status} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
