"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

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

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="edit-task-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
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
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
