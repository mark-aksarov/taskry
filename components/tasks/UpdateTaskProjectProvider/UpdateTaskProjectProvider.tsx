"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskProjectContext } from "../UpdateTaskProjectContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskProjectProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskProjectProvider({
  children,
}: UpdateTaskProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskProject");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskProject");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskProject");

  return (
    <UpdateTaskProjectContext.Provider value={contextValue}>
      {children}
    </UpdateTaskProjectContext.Provider>
  );
}
