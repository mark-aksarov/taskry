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
    onSuccess: async () => {
      // await refreshTaskDetail help keep the UI in sync when creating a subtask
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
