"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition, useRef } from "react";
import { useTranslations } from "next-intl";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";
import { useCreateEntityActionState } from "@/lib/hooks/useCreateEntityActionState";

interface NewTaskFormProps {
  categorySelectItems: { id: number; name: string }[];
  projectSelectItems: { id: number; title: string }[];
  assigneeSelectItems: { id: string; fullName: string }[];
  createTask: ActionFn<ActionState, FormData>;
}

export function NewTaskForm({
  categorySelectItems,
  projectSelectItems,
  assigneeSelectItems,
  createTask,
}: NewTaskFormProps) {
  const t = useTranslations("tasks.NewTaskForm");

  // The ref is used inside reducerAction
  // ref.current is null on unmount, preventing programmatic modal close when opening another form in the same modal
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useCreateEntityActionState({
    createEntity: createTask,
    formRef: ref,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase ref={ref} id="new-task-form" onSubmit={handleSubmit}>
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
