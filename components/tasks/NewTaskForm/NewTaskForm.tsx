"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { FormBase } from "@/components/common/FormBase";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";

const initialState: ActionState = {
  status: null,
};

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

  const [state, action, pending] = useActionState(createTask, initialState);

  return (
    <FormBase id="new-task-form" state={state} action={action}>
      <TaskTitleTextField />
      <TaskDescriptionTextField />
      <TaskDeadlineDatePicker />
      <TaskStatusSelect />
      {taskCategorySelect}
      {projectSelect}
      {assigneeSelect}
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
