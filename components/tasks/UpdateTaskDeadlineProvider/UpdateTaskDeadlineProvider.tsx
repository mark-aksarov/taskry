"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskDeadlineContext } from "../UpdateTaskDeadlineContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskDeadlineProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskDeadlineProvider({
  children,
}: UpdateTaskDeadlineProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskDeadline");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskDeadline");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskDeadline");

  return (
    <UpdateTaskDeadlineContext.Provider value={contextValue}>
      {children}
    </UpdateTaskDeadlineContext.Provider>
  );
}
