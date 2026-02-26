"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";

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

  // The ref is used inside reducerAction in useFormBaseActionState.
  // ref.current in useFormBaseActionState is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useFormBaseActionState(
    createTask,
    ref,
    t("successMessage"),
  );

  return (
    <FormBase
      ref={ref}
      id="new-task-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
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
