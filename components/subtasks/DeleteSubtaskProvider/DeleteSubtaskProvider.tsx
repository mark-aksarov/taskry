"use client";

import { DeleteSubtaskContext } from "../DeleteSubtaskContext";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";

interface DeleteSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function DeleteSubtaskProvider({
  taskId,
  children,
}: DeleteSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useActionStateWithOnSuccess(
    deleteSubtask,
    // await refreshTaskDetail help keep the UI in sync when deleting a subtask
    refreshTaskDetail,
  );

  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}
