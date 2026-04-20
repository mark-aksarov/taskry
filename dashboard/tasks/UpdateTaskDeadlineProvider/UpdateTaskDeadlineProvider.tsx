"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskDeadlineContext } from "../UpdateTaskDeadlineContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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

  useCloseModalOnActionSuccess(contextValue.state, "updateTaskDeadline");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateTaskDeadline");

  return (
    <UpdateTaskDeadlineContext.Provider value={contextValue}>
      {children}
    </UpdateTaskDeadlineContext.Provider>
  );
}
