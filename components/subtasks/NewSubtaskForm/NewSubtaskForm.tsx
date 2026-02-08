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
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

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

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-subtask-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <input type="hidden" name="taskId" value={taskId} />
        <SubtaskTextField />
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
