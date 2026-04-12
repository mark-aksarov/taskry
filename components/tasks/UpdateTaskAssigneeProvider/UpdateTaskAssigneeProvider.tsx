"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskAssigneeContext } from "../UpdateTaskAssigneeContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskAssigneeProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskAssigneeProvider({
  children,
}: UpdateTaskAssigneeProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskAssignee");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateTaskAssignee");
  useShowToastWhenModalClosedOnActionError(state, "updateTaskAssignee");

  return (
    <UpdateTaskAssigneeContext.Provider value={contextValue}>
      {children}
    </UpdateTaskAssigneeContext.Provider>
  );
}
