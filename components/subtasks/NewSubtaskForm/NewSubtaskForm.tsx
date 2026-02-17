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

  const closeModal = useCloseOverlay();

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, payload: FormData) => {
      // call server action to perform create subtask action
      const newState = await createSubtask(prevState, payload);

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
      id="new-subtask-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <input type="hidden" name="taskId" value={taskId} />
        <SubtaskTextField />
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
