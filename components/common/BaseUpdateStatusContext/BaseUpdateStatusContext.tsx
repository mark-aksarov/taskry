"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";

import { useActionState, useMemo } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

export interface BaseUpdateStatusContextType<TPayload> {
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
}

export interface UpdateStatusProviderProps<TPayload> {
  updateStatus: ActionFn<ActionState, TPayload>;
  children: React.ReactNode;
}

const initialState: ActionState = {
  status: null,
};

export function useBaseUpdateStatusContextState<TPayload>(
  updateStatus: ActionFn<ActionState, TPayload>,
) {
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, payload: TPayload) => {
      // call server action to perform delete action
      const newState = await updateStatus(prevState, payload);

      // close error toast
      closeErrorToast();

      // show error toast
      if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

  return useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );
}
