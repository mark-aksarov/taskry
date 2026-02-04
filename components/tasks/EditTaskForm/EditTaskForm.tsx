"use client";

import { useActionState } from "react";
import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
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

interface EditTaskFormProps {
  taskId: number;
  titleDefaultValue: string;
  descriptionDefaultValue?: string;
  deadlineDefaultValue: DateValue;
  statusSelectDefaultValue: TaskStatus;
  taskCategorySelect: React.ReactNode;
  projectSelect: React.ReactNode;
  assigneeSelect: React.ReactNode;
  updateTask: ActionFn<ActionState, FormData>;
}

export function EditTaskForm({
  taskId,
  titleDefaultValue,
  descriptionDefaultValue,
  deadlineDefaultValue,
  statusSelectDefaultValue,
  taskCategorySelect,
  projectSelect,
  assigneeSelect,
  updateTask,
}: EditTaskFormProps) {
  const t = useTranslations("tasks.EditTaskForm");

  const [state, action, pending] = useActionState(updateTask, initialState);

  return (
    <FormBase id="edit-task-form" state={state} action={action}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskTitleTextField defaultValue={titleDefaultValue} />
      <TaskDescriptionTextField defaultValue={descriptionDefaultValue} />
      <TaskDeadlineDatePicker defaultValue={deadlineDefaultValue} />
      <TaskStatusSelect defaultSelectedKey={statusSelectDefaultValue} />
      {taskCategorySelect}
      {projectSelect}
      {assigneeSelect}
      {state.status === "error" && (
        <ErrorBanner>{t("error.updateError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
