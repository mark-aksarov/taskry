"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreateTask } from "./CreateTaskContext";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { ProjectSelect } from "../projects/ProjectSelect";
import { UserSelect } from "../users/UserSelect";
import { TaskCategorySelect } from "../taskCategory/TaskCategorySelect";
import { TaskTitleTextField } from "./TaskTitleTextField";
import { TaskDeadlineDatePicker } from "./TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "./TaskDescriptionTextField";

interface CreateTaskFormProps {
  forcedAssigneeId?: string;
  categorySelectItems: { id: number; name: string }[];
  projectSelectItems: { id: number; title: string }[];
  assigneeSelectItems: { id: string; fullName: string }[];
}

export function CreateTaskForm({
  forcedAssigneeId,
  categorySelectItems,
  projectSelectItems,
  assigneeSelectItems,
}: CreateTaskFormProps) {
  const t = useTranslations("tasks.CreateTaskForm");

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
        <TaskDeadlineDatePicker />
        <TaskDescriptionTextField />
        <TaskStatusSelect />
        <TaskCategorySelect items={categorySelectItems} />
        <ProjectSelect items={projectSelectItems} />
        <UserSelect
          forcedAssigneeId={forcedAssigneeId}
          items={assigneeSelectItems}
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
