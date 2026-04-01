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
      // await refreshTaskDetail help keep the UI in sync when deleting a subtask
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
