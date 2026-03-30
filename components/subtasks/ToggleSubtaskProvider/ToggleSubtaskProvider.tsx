"use client";

import { ToggleSubtaskContext } from "../ToggleSubtaskContext";
import { toggleSubtask } from "@/lib/actions/subtask/toggleSubtask";
import { useRefreshTaskDetail } from "@/lib/swr/hooks/useRefreshTaskDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithOnSuccess } from "@/lib/hooks/useActionStateWithOnSuccess";

interface ToggleSubtaskProviderProps {
  taskId: number;
  children: React.ReactNode;
}

export function ToggleSubtaskProvider({
  taskId,
  children,
}: ToggleSubtaskProviderProps) {
  const refreshTaskDetail = useRefreshTaskDetail(taskId);

  const contextValue = useActionStateWithOnSuccess(
    toggleSubtask,
    // await refreshTaskDetail help keep the UI in sync when toggling a subtask
    refreshTaskDetail,
  );
  useShowToastOnActionError(contextValue.state);

  return (
    <ToggleSubtaskContext.Provider value={contextValue}>
      {children}
    </ToggleSubtaskContext.Provider>
  );
}
