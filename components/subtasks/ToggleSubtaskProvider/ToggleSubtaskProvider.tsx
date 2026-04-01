"use client";

import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface ToggleSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function ToggleSubtaskProvider({
  taskId,
  children,
}: ToggleSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useActionStateWithCallbacks(toggleSubtask, {
    onSettled: async () => {
      // Refresh task detail (inside TaskDetailContainer) on success or error to keep UI in sync
      // (e.g., show not found if deleted by another user)
      await refreshTaskDetail();
    },
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}
