"use client";

import { useMemo, useActionState } from "react";
import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { ActionState, ToggleSubtaskPayload } from "@/lib/actions/types";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

interface ToggleSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function ToggleSubtaskProvider({
  taskId,
  children,
}: ToggleSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const [state, action, isPending] = useActionState(
    async (state: ActionState, payload: ToggleSubtaskPayload) => {
      const newState = await toggleSubtask(state, payload);

      if (newState.status === "success") {
        // The following line isn't marked as transition
        // they help keep the UI in sync when refreshing task details.
        await refreshTaskDetail();
      }

      return newState;
    },
    initialState,
  );

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}
