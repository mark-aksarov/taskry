"use client";

import { CreateSubtaskContext } from "../CreateSubtaskContext";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface CreateSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function CreateSubtaskProvider({
  taskId,
  children,
}: CreateSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useActionStateWithCallbacks(createSubtask, {
    // Ensure the task detail stays up-to-date regardless of success or failure.
    // For example, another user might delete the task while a subtask is being created.
    // refreshTaskDetail triggers a re-render of TaskDetailContainer to sync the UI.
    onSettled: async () => {
      await refreshTaskDetail();
    },
  });

  useCloseModalOnActionSuccess(contextValue.state, "createSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createSubtask");

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
