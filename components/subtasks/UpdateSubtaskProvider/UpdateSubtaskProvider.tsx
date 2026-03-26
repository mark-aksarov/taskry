"use client";

import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { useUpdateSubtaskModal } from "../UpdateSubtaskModal";
import { UpdateSubtaskContext } from "../UpdateSubtaskContext";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const initialState: ActionState = {
  status: null,
};

interface UpdateSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function UpdateSubtaskProvider({
  taskId,
  children,
}: UpdateSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, payload: FormData) => {
      const newState = await updateSubtask(payload);

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
    useUpdateSubtaskModal();

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
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}
