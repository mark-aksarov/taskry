"use client";

import { startTransition } from "react";
import { CalendarDate } from "@internationalized/date";
import { FormBase } from "@/dashboard/common/FormBase";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { useUpdateTaskDeadline } from "../UpdateTaskDeadlineContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export interface UpdateTaskDeadlineFormProps {
  taskId: number;
  deadline: string;
}

export function UpdateTaskDeadlineForm({
  taskId,
  deadline,
}: UpdateTaskDeadlineFormProps) {
  const { state, action, isPending } = useUpdateTaskDeadline();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  const d = new Date(deadline);
  const deadlineValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <FormBase id="update-task-deadline-form" onSubmit={handleSubmit}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskDeadlineDatePicker
        defaultValue={deadlineValue}
        matchTriggerWidth={false}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
