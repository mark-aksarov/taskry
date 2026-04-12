"use client";

import { useRouter } from "@/i18n/navigation";
import { updateTask } from "@/lib/actions/task/updateTask";
import { UpdateTaskCategoryForTaskContext } from "../UpdateTaskCategoryForTaskContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateTaskCategoryForTaskProviderProps {
  children: React.ReactNode;
}

export function UpdateTaskCategoryForTaskProvider({
  children,
}: UpdateTaskCategoryForTaskProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateTask, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateTaskCategoryForTask");
  useShowToastWhenModalClosedOnActionSuccess(
    state,
    "updateTaskCategoryForTask",
  );
  useShowToastWhenModalClosedOnActionError(state, "updateTaskCategoryForTask");

  return (
    <UpdateTaskCategoryForTaskContext.Provider value={contextValue}>
      {children}
    </UpdateTaskCategoryForTaskContext.Provider>
  );
}
