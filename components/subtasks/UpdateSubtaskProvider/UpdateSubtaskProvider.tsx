"use client";

import { UpdateSubtaskContext } from "../UpdateSubtaskContext";
import { updateSubtask } from "@/lib/actions/subtask/updateSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function UpdateSubtaskProvider({
  taskId,
  children,
}: UpdateSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useActionStateWithOnSuccess(
    updateSubtask,
    // await refreshTaskDetail help keep the UI in sync when updating a subtask
    refreshTaskDetail,
  );

  useCloseModalOnActionSuccess(contextValue.state, "updateSubtask");
  useShowToastWhenModalClosedOnActionError(contextValue.state, "updateSubtask");

  return (
    <UpdateSubtaskContext.Provider value={contextValue}>
      {children}
    </UpdateSubtaskContext.Provider>
  );
}
