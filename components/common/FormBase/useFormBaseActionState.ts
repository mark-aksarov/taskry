"use client";

import { useActionState, useContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useSuccessToast } from "@/lib/hooks/useSuccessToast";
import { OverlayTriggerStateContext } from "react-aria-components";

const initialState: ActionState = {
  status: null,
};

export function useFormBaseActionState(
  action: ActionFn<ActionState, FormData>,
  formRef: React.RefObject<HTMLFormElement | null>,
  successMessage: string,
) {
  const { add: addSuccessToast } = useSuccessToast();

  // FormBase must be used within a FormBaseModal, which is wrapped in OverlayTriggerStateContext
  const context = useContext(OverlayTriggerStateContext);

  if (!context) {
    throw new Error("FormBase must be used within a OverlayTriggerProvider");
  }

  const { close: closeModal } = context;

  return useActionState(async (prevState: ActionState, payload: FormData) => {
    const newState = await action(prevState, payload);

    if (newState.status === "success") {
      // Close the modal only if the form is not unmounted
      if (formRef.current) {
        closeModal();
      }

      addSuccessToast(successMessage);
    }

    return newState;
  }, initialState);
}
