"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { TaskStatus } from "@/generated/prisma/enums";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateTaskStatusAlt } from "./UpdateTaskStatusAltContext";

export interface UpdateTaskStatusFormProps {
  taskId: number;
  status: TaskStatus;
}

export function UpdateTaskStatusForm({
  taskId,
  status,
}: UpdateTaskStatusFormProps) {
  const t = useTranslations("tasks.UpdateTaskStatusForm");

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
      <FormBaseBody>
        {taskId && <input type="hidden" name="id" value={taskId} />}
        <TaskStatusSelect defaultSelectedKey={status} />

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
