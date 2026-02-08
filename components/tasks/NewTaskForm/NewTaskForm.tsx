"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
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

  useCloseOverlayOnActionSuccess(state);

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
        {state.status === "error" && (
          <ErrorBanner>{t("error.creationError")}</ErrorBanner>
        )}
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
