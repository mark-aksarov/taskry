"use client";

import { useActionState } from "react";
import { useErrorToast } from "./useErrorToast";
import { useSuccessToast } from "@/lib/hooks/useSuccessToast";
import { ActionFn, ActionState } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
};

interface useDeleteActionStateProps<TPayload> {
  deleteEntity: ActionFn<ActionState, TPayload>;
  onSuccess?: () => void;
  successMessage: string;
}

export function useDeleteActionState<TPayload>({
  deleteEntity,
  onSuccess,
  successMessage,
}: useDeleteActionStateProps<TPayload>) {
  const { add: addSuccessToast } = useSuccessToast();

  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(async (prevState: ActionState, payload: TPayload) => {
    // call server action to perform delete action
    const newState = await deleteEntity(prevState, payload);

    // close error toast
    closeErrorToast();

    if (newState.status === "success") {
      onSuccess?.();
      addSuccessToast(successMessage);
    }
    // show error toast
    else if (newState.status === "error" && newState.message) {
      addErrorToast(newState.message);
    }

    return newState;
  }, initialState);
}
