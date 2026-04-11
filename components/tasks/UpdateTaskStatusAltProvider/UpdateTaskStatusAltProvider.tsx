"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskStatusAltContext } from "../UpdateTaskStatusAltContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskStatusAltProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskStatusAltProvider({
  children,
}: UpdateTaskStatusAltProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskStatus");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskStatus");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskStatus");

  return (
    <UpdateTaskStatusAltContext.Provider value={contextValue}>
      {children}
    </UpdateTaskStatusAltContext.Provider>
  );
}
