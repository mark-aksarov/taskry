"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { SubtaskTextField } from "../SubtaskTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";

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

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="edit-subtask-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <input type="hidden" name="id" value={subtaskId} />
        <input type="hidden" name="taskId" value={taskId} />
        <SubtaskTextField defaultValue={textDefaultValue} />
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
