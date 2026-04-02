"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateTaskContext } from "../UpdateTaskContext";
import { updateTask } from "@/lib/actions/task/updateTask";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskProvider({ children }: UpdateTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTask");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTask");
  useShowToastWhenModalClosedOnActionError(state, "updateTask");

  return (
    <UpdateTaskContext.Provider value={contextValue}>
      {children}
    </UpdateTaskContext.Provider>
  );
}
