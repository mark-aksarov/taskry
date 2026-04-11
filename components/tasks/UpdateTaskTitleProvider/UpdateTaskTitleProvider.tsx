"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskTitleContext } from "../UpdateTaskTitleContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskTitleProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskTitleProvider({
  children,
}: UpdateTaskTitleProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskTitle");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskTitle");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskTitle");

  return (
    <UpdateTaskTitleContext.Provider value={contextValue}>
      {children}
    </UpdateTaskTitleContext.Provider>
  );
}
