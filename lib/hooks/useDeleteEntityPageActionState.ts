"use client";

import { useActionState } from "react";
import { useErrorToast } from "./useErrorToast";
import { ActionFn, ActionState } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
};

interface useDeleteEntityPageActionStateProps<TPayload> {
  deleteEntity: ActionFn<ActionState, TPayload>;
}

export function useDeleteEntityPageActionState<TPayload>({
  deleteEntity,
}: useDeleteEntityPageActionStateProps<TPayload>) {
  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  return useActionState(async (prevState: ActionState, payload: TPayload) => {
    // call server action to perform delete action
    const newState = await deleteEntity(prevState, payload);

    // close error toast
    closeErrorToast();

    // show error toast
    if (newState.status === "error" && newState.message) {
      addErrorToast(newState.message);
    }

    return newState;
  }, initialState);
}
