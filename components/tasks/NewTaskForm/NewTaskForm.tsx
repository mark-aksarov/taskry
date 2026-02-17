"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";

interface NewTaskFormProps {
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
  createTask: ActionFn<ActionState, FormData>;
}

export function NewTaskForm({
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
  createTask,
}: NewTaskFormProps) {
  const t = useTranslations("tasks.NewTaskForm");

  const [state, action, isPending] = useFormBaseActionState(createTask);

  return (
    <FormBase
      id="new-task-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <TaskTitleTextField />
        <TaskDescriptionTextField />
        <TaskDeadlineDatePicker />
        <TaskStatusSelect />
        {taskCategorySelect}
        {projectSelect}
        {assigneeSelect}
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
