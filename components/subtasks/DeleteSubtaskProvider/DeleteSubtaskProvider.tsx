"use client";

import { DeleteSubtaskContext } from "../DeleteSubtaskContext";
import { deleteSubtask } from "@/lib/actions/subtask/deleteSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function DeleteSubtaskProvider({
  taskId,
  children,
}: DeleteSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useActionStateWithCallbacks(deleteSubtask, {
    onSettled: async () => {
      // Refresh task detail (inside TaskDetailContainer) on success or error to keep UI in sync
      // (e.g., show not found if deleted by another user)
      await refreshTaskDetail();
    },
  });

  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteSubtaskContext.Provider value={contextValue}>
      {children}
    </DeleteSubtaskContext.Provider>
  );
}
