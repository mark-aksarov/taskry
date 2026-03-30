"use client";

import { CreateSubtaskContext } from "../CreateSubtaskContext";
import { createSubtask } from "@/lib/actions/subtask/createSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";
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

  const contextValue = useActionStateWithOnSuccess(
    createSubtask,
    // await refreshTaskDetail help keep the UI in sync when creating a subtask
    refreshTaskDetail,
  );

  useCloseModalOnActionSuccess(contextValue.state, "createSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createSubtask");

  return (
    <CreateSubtaskContext.Provider value={contextValue}>
      {children}
    </CreateSubtaskContext.Provider>
  );
}
