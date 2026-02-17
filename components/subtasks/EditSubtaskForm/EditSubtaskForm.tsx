"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { SubtaskTextField } from "../SubtaskTextField";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseOverlay } from "@/lib/hooks/useCloseOverlay";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

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

  const closeModal = useCloseOverlay();

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, payload: FormData) => {
      // call server action to perform edit subtask action
      const newState = await updateSubtask(prevState, payload);

      // call swr mutate to refresh subtasks and close modal
      if (newState.status === "success") {
        closeModal();
        mutate?.();
      }

      return newState;
    },
    initialState,
  );

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
