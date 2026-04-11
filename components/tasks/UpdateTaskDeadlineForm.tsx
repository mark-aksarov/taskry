"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { TaskDeadlineDatePicker } from "./TaskDeadlineDatePicker";
import { useUpdateTaskDeadline } from "./UpdateTaskDeadlineContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

export interface UpdateTaskDeadlineFormProps {
  taskId: number;
  deadline: string;
}

export function UpdateTaskDeadlineForm({
  taskId,
  deadline,
}: UpdateTaskDeadlineFormProps) {
  const t = useTranslations("tasks.UpdateTaskDeadlineForm");

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
      <FormBaseBody>
        {taskId && <input type="hidden" name="id" value={taskId} />}
        <TaskDeadlineDatePicker
          defaultValue={deadlineValue}
          matchTriggerWidth={false}
        />

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
