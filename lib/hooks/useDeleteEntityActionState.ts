"use client";

import { useActionState } from "react";
import { useErrorToast } from "./useErrorToast";
import { useSuccessToast } from "./useSuccessToast";
import { ActionFn, ActionState } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
};

interface useDeleteEntityActionStateProps<TPayload> {
  deleteEntity: ActionFn<ActionState, TPayload>;
  onSuccess?: () => void;
  successMessage: string;
}

export function useDeleteEntityActionState<TPayload>({
  deleteEntity,
  onSuccess,
  successMessage,
}: useDeleteEntityActionStateProps<TPayload>) {
  const { add: addSuccessToast } = useSuccessToast();

  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(async (prevState: ActionState, payload: TPayload) => {
    // call server action to perform delete action
    const newState = await deleteEntity(prevState, payload);

    // side effects
    closeErrorToast();

    if (newState.status === "success") {
      onSuccess?.();
      addSuccessToast(successMessage);
    } else if (newState.status === "error" && newState.message) {
      addErrorToast(newState.message);
    }

    return newState;
  }, initialState);
}
