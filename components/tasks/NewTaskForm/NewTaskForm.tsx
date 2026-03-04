"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreateTask } from "../CreateTaskContext";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";

interface NewTaskFormProps {
  categorySelectItems: { id: number; name: string }[];
  projectSelectItems: { id: number; title: string }[];
  assigneeSelectItems: { id: string; fullName: string }[];
}

export function NewTaskForm({
  categorySelectItems,
  projectSelectItems,
  assigneeSelectItems,
}: NewTaskFormProps) {
  const t = useTranslations("tasks.NewTaskForm");

  const { state, action, isPending } = useCreateTask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-task-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskTitleTextField />
        <TaskDescriptionTextField />
        <TaskDeadlineDatePicker />
        <TaskStatusSelect />
        <TaskCategorySelect items={categorySelectItems} />
        <TaskProjectSelect items={projectSelectItems} />
        <TaskAssigneeSelect items={assigneeSelectItems} />
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
