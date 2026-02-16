"use client";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { useActionState, useMemo } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

export interface BaseUpdateTaskStatusContextType {
  state: ActionState;
  action: (payload: UpdateTaskStatusesPayload) => void;
  isPending: boolean;
}

export interface UpdateTaskStatusProviderProps {
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  children: React.ReactNode;
}

const initialState: ActionState = {
  status: null,
};

export function useBaseUpdateTaskStatusContextState(
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>,
) {
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [state, action, isPending] = useActionState(
    async (prevState: ActionState, payload: UpdateTaskStatusesPayload) => {
      // call server action to perform delete action
      const newState = await updateTaskStatus(prevState, payload);

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
