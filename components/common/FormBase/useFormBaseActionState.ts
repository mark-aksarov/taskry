"use client";

import { useActionState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCloseOverlay } from "@/lib/hooks/useCloseOverlay";

const initialState: ActionState = {
  status: null,
};

export function useFormBaseActionState(
  action: ActionFn<ActionState, FormData>,
) {
  const closeModal = useCloseOverlay();

  return useActionState(async (prevState: ActionState, payload: FormData) => {
    const newState = await action(prevState, payload);

    if (newState.status === "success") {
      closeModal();
    }

    return newState;
  }, initialState);
}
