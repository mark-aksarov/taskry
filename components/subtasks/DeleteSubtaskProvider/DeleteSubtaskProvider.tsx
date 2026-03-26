"use client";

import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { DeleteSubtaskContext } from "../DeleteSubtaskContext";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

const initialState: ActionState = {
  status: null,
};

interface DeleteSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function DeleteSubtaskProvider({
  taskId,
  children,
}: DeleteSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, id: number) => {
      const newState = await deleteSubtask(id);

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
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}
