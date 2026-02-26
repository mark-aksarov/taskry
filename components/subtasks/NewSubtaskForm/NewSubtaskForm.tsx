"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { SubtaskTextField } from "../SubtaskTextField";
import { useActionState, useContext, useRef } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { OverlayTriggerStateContext } from "react-aria-components";
import { useSuccessToast } from "@/lib/hooks/useSuccessToast";

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

  // The ref is used inside reducerAction
  // ref.current is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  // FormBase must be used within a FormBaseModal, which is wrapped in OverlayTriggerStateContext
  const context = useContext(OverlayTriggerStateContext);

  if (!context) {
    throw new Error("FormBase must be used within a OverlayTriggerProvider");
  }

  const { close: closeModal } = context;

  const { add: addSuccessToast } = useSuccessToast();

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, payload: FormData) => {
      // call server action to perform create subtask action
      const newState = await createSubtask(prevState, payload);

      // call swr mutate to refresh subtasks and close modal
      if (newState.status === "success") {
        if (ref.current) {
          closeModal();
        }

        addSuccessToast(t("successMessage"));
        mutate?.();
      }

      return newState;
    },
    initialState,
  );

  return (
    <FormBase
      ref={ref}
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
