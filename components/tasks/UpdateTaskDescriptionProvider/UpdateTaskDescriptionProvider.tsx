"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskDescriptionContext } from "../UpdateTaskDescriptionContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskDescriptionProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskDescriptionProvider({
  children,
}: UpdateTaskDescriptionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskDescription");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskDescription");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskDescription");

  return (
    <UpdateTaskDescriptionContext.Provider value={contextValue}>
      {children}
    </UpdateTaskDescriptionContext.Provider>
  );
}
