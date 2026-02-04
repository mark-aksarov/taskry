"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { SubtaskTextField } from "../SubtaskTextField";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";

const initialState: ActionState = {
  status: null,
};

interface EditSubtaskFormProps {
  subtaskId: number;
  taskId: number;
  mutate?: () => void;
  textDefaultValue?: string;
  updateSubtask: ActionFn<ActionState, FormData>;
}

export function EditSubtaskForm({
  subtaskId,
  taskId,
  mutate,
  textDefaultValue,
  updateSubtask,
}: EditSubtaskFormProps) {
  const t = useTranslations("subtasks.EditSubtaskForm");

  const [state, action, pending] = useActionState(updateSubtask, initialState);

  useEffect(() => {
    if (state.status === "success" && mutate) {
      mutate();
    }
  }, [state, mutate]);

  return (
    <FormBase id="edit-subtask-form" state={state} action={action}>
      <input type="hidden" name="id" value={subtaskId} />
      <input type="hidden" name="taskId" value={taskId} />
      <SubtaskTextField defaultValue={textDefaultValue} />
      {state.status === "error" && (
        <ErrorBanner>{t("error.updateError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
