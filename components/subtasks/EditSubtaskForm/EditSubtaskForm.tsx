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
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

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

  const [state, action, isPending] = useActionState(
    updateSubtask,
    initialState,
  );

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
        <FormErrorBanner status={state.status} isPending={isPending}>
          {t("error.updateError")}
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
