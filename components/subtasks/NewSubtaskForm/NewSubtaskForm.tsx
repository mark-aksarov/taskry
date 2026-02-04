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

interface NewSubtaskFormProps {
  taskId: number;
  mutate?: () => void;
  createSubtask: ActionFn<ActionState, FormData>;
}

export function NewSubtaskForm({
  taskId,
  mutate,
  createSubtask,
}: NewSubtaskFormProps) {
  const t = useTranslations("subtasks.NewSubtaskForm");

  const [state, action, pending] = useActionState(createSubtask, initialState);

  useEffect(() => {
    if (state.status === "success" && mutate) {
      mutate();
    }
  }, [state, mutate]);

  return (
    <FormBase id="new-subtask-form" state={state} action={action}>
      <input type="hidden" name="taskId" value={taskId} />
      <SubtaskTextField />
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
