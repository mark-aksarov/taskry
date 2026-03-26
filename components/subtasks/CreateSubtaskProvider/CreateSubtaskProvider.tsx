"use client";

import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { CreateSubtaskContext } from "../CreateSubtaskContext";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useCreateSubtaskModal } from "../CreateSubtaskModal/CreateSubtaskModalContext";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const initialState: ActionState = {
  status: null,
};

interface CreateSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function CreateSubtaskProvider({
  taskId,
  children,
}: CreateSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await createSubtask(payload);

      if (newState.status === "success") {
        // The following line isn't marked as transition
        // they help keep the UI in sync when refreshing task details.
        await refreshTaskDetail();
      }

      return newState;
    },
    initialState,
  );

  // we need to track CreateSubtaskModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useCreateSubtaskModal();

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
